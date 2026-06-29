from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func, update
from typing import List

from app.database import get_db
from app.deps import get_current_user
from app.models.survey import Survey
from app.models.question import Question
from app.schemas import (
    slugify,
    SurveyCreateRequest,
    SurveyUpdateRequest,
    SurveyResponse,
    SurveyListResponse,
    QuestionCreateRequest,
    QuestionUpdateRequest,
    QuestionResponse,
    QuestionListResponse,
)


def _questions_to_list(questions: List[Question]) -> dict:
    return {"questions": [q.to_dict() for q in questions]}

router = APIRouter(prefix="/api/surveys", tags=["Surveys"])


@router.get("/my", response_model=SurveyListResponse)
def list_surveys(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """List surveys created by the current user with pagination."""
    offset = (page - 1) * page_size
    total = db.query(func.count(Survey.id)).filter(
        Survey.creator_id == current_user.id
    ).scalar()
    surveys = db.query(Survey).filter(
        Survey.creator_id == current_user.id
    ).offset(offset).limit(page_size).all()

    survey_list = []
    for s in surveys:
        survey_list.append(s.to_dict())

    return SurveyListResponse(
        surveys=survey_list,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.post("/", response_model=SurveyResponse, status_code=status.HTTP_201_CREATED)
def create_survey(
    request: SurveyCreateRequest,
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Create a new survey with auto-generated slug."""
    slug = slugify(request.title)

    # Check for duplicate slug
    existing = db.query(Survey).filter(Survey.slug == slug).first()
    if existing:
        # Try appending a number
        counter = 2
        while True:
            candidate = f"{slug}-{counter}"
            if not db.query(Survey).filter(Survey.slug == candidate).first():
                slug = candidate
                break
            counter += 1

    survey = Survey(
        creator_id=current_user.id,
        title=request.title,
        description=request.description,
        slug=slug,
        status='active',
    )
    db.add(survey)
    db.commit()
    db.refresh(survey)
    return survey.to_dict()


@router.get("/{survey_id}", response_model=SurveyResponse)
def get_survey(
    survey_id: int,
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Get a survey by ID with nested questions."""
    survey = db.query(Survey).filter(Survey.id == survey_id).first()
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    # Verify ownership
    if survey.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    return survey.to_dict()


@router.put("/{survey_id}", response_model=SurveyResponse)
def update_survey(
    survey_id: int,
    request: SurveyUpdateRequest,
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Update a survey's title, description, or status."""
    survey = db.query(Survey).filter(Survey.id == survey_id).first()
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    if survey.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    if request.title is not None:
        survey.title = request.title
        survey.slug = slugify(request.title)
    if request.description is not None:
        survey.description = request.description
    if request.status is not None:
        survey.status = request.status

    db.commit()
    db.refresh(survey)
    return survey.to_dict()


@router.delete("/{survey_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_survey(
    survey_id: int,
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Delete a survey and all associated questions, responses, and answers."""
    survey = db.query(Survey).filter(Survey.id == survey_id).first()
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    if survey.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(survey)
    db.commit()


@router.get("/{survey_id}/questions")
def get_questions(
    survey_id: int,
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Get ordered questions for a survey."""
    survey = db.query(Survey).filter(Survey.id == survey_id).first()
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    if survey.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    questions = db.query(Question).filter(
        Question.survey_id == survey_id
    ).order_by(Question.position).all()

    return _questions_to_list(questions)


@router.post("/{survey_id}/questions", response_model=QuestionResponse, status_code=status.HTTP_201_CREATED)
def create_question(
    survey_id: int,
    request: QuestionCreateRequest,
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Create a new question for a survey."""
    survey = db.query(Survey).filter(Survey.id == survey_id).first()
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    if survey.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Validate text length based on type
    if request.question_type == 'short_text':
        if len(request.text) > 500:
            raise HTTPException(status_code=422, detail="Short text must be at most 500 characters")
    elif request.question_type == 'long_text':
        if len(request.text) > 2000:
            raise HTTPException(status_code=422, detail="Long text must be at most 2000 characters")

    # Type-specific validation
    if request.question_type == 'multiple_choice':
        if not request.options:
            raise HTTPException(status_code=422, detail="options field is required for multiple_choice")
        if not isinstance(request.options, list):
            raise HTTPException(status_code=422, detail="options must be a list")
        if len(request.options) > 10:
            raise HTTPException(status_code=422, detail="maximum 10 options allowed")
        if len(set(request.options)) != len(request.options):
            raise HTTPException(status_code=422, detail="options must be unique")
        for opt in request.options:
            if not isinstance(opt, str) or not opt.strip():
                raise HTTPException(status_code=422, detail="each option must be a non-empty string")

    elif request.question_type == 'rating':
        if request.min is not None and (not isinstance(request.min, int) or request.min < 1 or request.min > 5):
            raise HTTPException(status_code=422, detail="rating min must be an integer between 1 and 5")
        if request.max is not None and (not isinstance(request.max, int) or request.max < 1 or request.max > 5):
            raise HTTPException(status_code=422, detail="rating max must be an integer between 1 and 5")
        if request.min is not None and request.max is not None and request.min > request.max:
            raise HTTPException(status_code=422, detail="rating min must be less than or equal to max")

    # Encode options as JSON string for storage
    options_json = None
    if request.options is not None:
        import json
        options_json = json.dumps(request.options)

    # Set default position
    existing_count = db.query(Question).filter(Question.survey_id == survey_id).count()

    question = Question(
        survey_id=survey_id,
        text=request.text,
        question_type=request.question_type,
        position=existing_count,
        required=request.required,
        options=options_json,
        min=request.min,
        max=request.max,
    )
    db.add(question)
    db.commit()
    db.refresh(question)
    return question.to_dict()


@router.patch("/{survey_id}/questions/reorder")
def reorder_questions(
    survey_id: int,
    question_ids: List[int] = Query(..., description="List of question IDs in desired order"),
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Bulk reorder questions by providing a list of question IDs in desired order."""
    survey = db.query(Survey).filter(Survey.id == survey_id).first()
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    if survey.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Verify all question IDs belong to this survey
    for qid in question_ids:
        q = db.query(Question).filter(Question.id == qid, Question.survey_id == survey_id).first()
        if not q:
            raise HTTPException(status_code=404, detail=f"Question {qid} not found or not part of this survey")

    # Update positions
    for idx, qid in enumerate(question_ids):
        db.query(Question).filter(Question.id == qid).update({'position': idx})

    db.commit()

    questions = db.query(Question).filter(
        Question.survey_id == survey_id
    ).order_by(Question.position).all()

    return _questions_to_list(questions)


@router.patch("/{survey_id}/questions/{question_id}/move-up")
def move_question_up(
    survey_id: int,
    question_id: int,
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Move a question up by one position."""
    survey = db.query(Survey).filter(Survey.id == survey_id).first()
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    if survey.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    question = db.query(Question).filter(Question.id == question_id, Question.survey_id == survey_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Find the question above
    above = db.query(Question).filter(
        Question.survey_id == survey_id,
        Question.position == question.position - 1,
    ).first()

    if not above:
        raise HTTPException(status_code=400, detail="Cannot move up: already at top")

    # Use raw SQL to swap positions atomically
    old_q_pos = question.position
    old_above_pos = above.position
    db.execute(
        update(Question)
        .where(Question.id == question_id)
        .values(position=above.position)
    )
    db.execute(
        update(Question)
        .where(Question.id == above.id)
        .values(position=old_q_pos)
    )

    db.commit()
    moved = db.query(Question).filter(Question.id == question_id).first()
    return moved.to_dict() if moved else question.to_dict()


@router.patch("/{survey_id}/questions/{question_id}/move-down")
def move_question_down(
    survey_id: int,
    question_id: int,
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Move a question down by one position."""
    survey = db.query(Survey).filter(Survey.id == survey_id).first()
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    if survey.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    question = db.query(Question).filter(Question.id == question_id, Question.survey_id == survey_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Find the question below
    below = db.query(Question).filter(
        Question.survey_id == survey_id,
        Question.position == question.position + 1,
    ).first()

    if not below:
        raise HTTPException(status_code=400, detail="Cannot move down: already at bottom")

    # Use raw SQL to swap positions atomically
    old_q_pos = question.position
    db.execute(
        update(Question)
        .where(Question.id == question_id)
        .values(position=below.position)
    )
    db.execute(
        update(Question)
        .where(Question.id == below.id)
        .values(position=old_q_pos)
    )

    db.commit()
    moved = db.query(Question).filter(Question.id == question_id).first()
    return moved.to_dict() if moved else question.to_dict()


@router.delete("/{survey_id}/questions/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_question(
    survey_id: int,
    question_id: int,
    db: Session = Depends(get_db),
    current_user: object = Depends(get_current_user),
):
    """Delete a question from a survey."""
    question = db.query(Question).filter(
        Question.id == question_id,
        Question.survey_id == survey_id,
    ).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    if survey.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(question)
    db.commit()
