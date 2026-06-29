import pytest
import tempfile
import os
import json
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.main import app
from app.database import Base, engine, SessionLocal, get_db
from app.models import User, Survey
from app.utils import hash_password


@pytest.fixture(scope="function")
def db_session():
    """Create a completely fresh SQLite database file for each test."""
    fd, db_path = tempfile.mkstemp(suffix=".db")
    os.close(fd)

    test_engine = create_engine(
        f"sqlite:///{db_path}",
        connect_args={"check_same_thread": False},
    )
    test_session_factory = sessionmaker(
        autocommit=False, autoflush=False, bind=test_engine,
    )

    import app.database as db_module
    db_module.engine = test_engine
    db_module.SessionLocal = test_session_factory

    Base.metadata.create_all(bind=test_engine)

    yield test_session_factory()

    db_module.engine = engine
    db_module.SessionLocal = SessionLocal
    try:
        os.unlink(db_path)
    except OSError:
        pass


@pytest.fixture(scope="function")
def client(db_session):
    return TestClient(app)


@pytest.fixture
def valid_credentials(client, db_session):
    user = User(
        username="testuser",
        email="test@example.com",
        full_name="Test User",
    )
    user.hash_password("securepass123")
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return {
        "username": user.username,
        "email": user.email,
        "password": "securepass123",
        "user_id": user.id,
    }


@pytest.fixture
def auth_headers(client, db_session, valid_credentials):
    response = client.post(
        "/api/auth/login",
        json={
            "username": valid_credentials["username"],
            "password": valid_credentials["password"],
        },
    )
    token = response.json()["token"]
    return {"Authorization": f"Bearer {token}"}


# --- Survey CRUD Tests ---

def test_create_survey_success(client, db_session, auth_headers):
    """Test successful survey creation with auto-slug."""
    response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "My Test Survey", "description": "A test survey"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "My Test Survey"
    assert data["description"] == "A test survey"
    assert data["status"] == "active"
    assert data["slug"] == "my-test-survey"
    assert data["question_count"] == 0
    assert "id" in data
    assert "creator_id" in data


def test_create_survey_duplicate_slug(client, db_session, auth_headers):
    """Test that duplicate slugs get a numeric suffix."""
    client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Test Survey", "description": ""},
    )
    response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Test Survey", "description": ""},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["slug"] == "test-survey-2"


def test_create_survey_missing_fields(client, db_session, auth_headers):
    """Test survey creation with missing required fields."""
    response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": ""},
    )
    assert response.status_code == 422


def test_list_surveys(client, db_session, auth_headers):
    """Test listing surveys with pagination."""
    # Create a survey
    client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Survey 1", "description": ""},
    )

    response = client.get(
        "/api/surveys/my",
        headers=auth_headers,
        params={"page": 1, "page_size": 10},
    )
    assert response.status_code == 200
    data = response.json()
    assert "surveys" in data
    assert "total" in data
    assert "page" in data
    assert "page_size" in data
    assert data["total"] == 1
    assert len(data["surveys"]) == 1
    assert data["surveys"][0]["title"] == "Survey 1"


def test_list_surveys_unauthenticated(client, db_session):
    """Test that listing surveys without auth returns 401."""
    response = client.get("/api/surveys/my")
    assert response.status_code == 401


def test_get_survey(client, db_session, auth_headers):
    """Test getting a survey by ID."""
    # Create a survey
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Get Test Survey", "description": ""},
    )
    survey_id = create_response.json()["id"]

    response = client.get(
        f"/api/surveys/{survey_id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Get Test Survey"
    assert data["question_count"] == 0


def test_get_survey_not_found(client, db_session, auth_headers):
    """Test getting a non-existent survey."""
    response = client.get(
        "/api/surveys/99999",
        headers=auth_headers,
    )
    assert response.status_code == 404


def test_get_survey_unauthorized(client, db_session, auth_headers, valid_credentials):
    """Test getting a survey not owned by the user."""
    # Create survey as testuser
    client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Private Survey", "description": ""},
    )

    # Login as different user
    other_user = User(
        username="otheruser",
        email="other@example.com",
        full_name="Other User",
    )
    other_user.hash_password("otherpass")
    db_session.add(other_user)
    db_session.commit()
    db_session.refresh(other_user)

    login_response = client.post(
        "/api/auth/login",
        json={"username": other_user.username, "password": "otherpass"},
    )
    other_token = login_response.json()["token"]
    other_headers = {"Authorization": f"Bearer {other_token}"}

    response = client.get(
        f"/api/surveys/{valid_credentials['user_id']}",
        headers=other_headers,
    )
    assert response.status_code == 403


def test_update_survey(client, db_session, auth_headers):
    """Test updating a survey."""
    # Create survey
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Original Title", "description": "Original desc"},
    )
    survey_id = create_response.json()["id"]

    # Update
    response = client.put(
        f"/api/surveys/{survey_id}",
        headers=auth_headers,
        json={"title": "Updated Title", "description": "Updated desc", "status": "closed"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Title"
    assert data["description"] == "Updated desc"
    assert data["status"] == "closed"
    assert data["slug"] == "updated-title"  # slug regenerated


def test_update_survey_not_found(client, db_session, auth_headers):
    """Test updating a non-existent survey."""
    response = client.put(
        "/api/surveys/99999",
        headers=auth_headers,
        json={"title": "New Title"},
    )
    assert response.status_code == 404


def test_delete_survey(client, db_session, auth_headers):
    """Test deleting a survey."""
    # Create survey
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Delete Me", "description": ""},
    )
    survey_id = create_response.json()["id"]

    # Delete
    response = client.delete(
        f"/api/surveys/{survey_id}",
        headers=auth_headers,
    )
    assert response.status_code == 204

    # Verify deleted
    response = client.get(
        f"/api/surveys/{survey_id}",
        headers=auth_headers,
    )
    assert response.status_code == 404


def test_delete_survey_cascade(client, db_session, auth_headers):
    """Test that deleting a survey also deletes questions."""
    # Create survey with questions
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Cascade Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Question 1", "question_type": "short_text"},
    )
    client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Question 2", "question_type": "multiple_choice", "options": ["A", "B"]},
    )

    # Delete survey
    response = client.delete(
        f"/api/surveys/{survey_id}",
        headers=auth_headers,
    )
    assert response.status_code == 204

    # Verify questions are gone
    response = client.get(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
    )
    assert response.status_code == 404


# --- Question CRUD Tests ---

def test_create_question_multiple_choice(client, db_session, auth_headers):
    """Test creating a multiple choice question."""
    # Create survey
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "MC Question Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={
            "text": "What is your favorite color?",
            "question_type": "multiple_choice",
            "required": False,
            "options": ["Red", "Blue", "Green"],
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["text"] == "What is your favorite color?"
    assert data["question_type"] == "multiple_choice"
    assert data["options"] == ["Red", "Blue", "Green"]
    assert data["position"] == 0


def test_create_question_rating(client, db_session, auth_headers):
    """Test creating a rating question."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Rating Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={
            "text": "How satisfied are you?",
            "question_type": "rating",
            "required": True,
            "min": 1,
            "max": 5,
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["question_type"] == "rating"
    assert data["min"] == 1
    assert data["max"] == 5


def test_create_question_short_text(client, db_session, auth_headers):
    """Test creating a short text question."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Short Text Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={
            "text": "Enter your name",
            "question_type": "short_text",
            "required": True,
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["question_type"] == "short_text"


def test_create_question_long_text(client, db_session, auth_headers):
    """Test creating a long text question."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Long Text Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={
            "text": "Tell us more about yourself",
            "question_type": "long_text",
            "required": False,
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["question_type"] == "long_text"


def test_create_question_invalid_type(client, db_session, auth_headers):
    """Test creating a question with invalid type."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Invalid Type Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={
            "text": "Invalid type question",
            "question_type": "invalid_type",
        },
    )
    assert response.status_code == 422


def test_create_multiple_choice_missing_options(client, db_session, auth_headers):
    """Test creating multiple choice without options."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "MC Missing Options", "description": ""},
    )
    survey_id = create_response.json()["id"]

    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={
            "text": "Favorite color?",
            "question_type": "multiple_choice",
        },
    )
    assert response.status_code == 422


def test_create_multiple_choice_duplicate_options(client, db_session, auth_headers):
    """Test creating multiple choice with duplicate options."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "MC Duplicate Options", "description": ""},
    )
    survey_id = create_response.json()["id"]

    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={
            "text": "Favorite color?",
            "question_type": "multiple_choice",
            "options": ["Red", "Blue", "Red"],
        },
    )
    assert response.status_code == 422


def test_create_multiple_choice_too_many_options(client, db_session, auth_headers):
    """Test creating multiple choice with more than 10 options."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "MC Too Many", "description": ""},
    )
    survey_id = create_response.json()["id"]

    options = [f"Option {i}" for i in range(11)]
    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Too many options?", "question_type": "multiple_choice", "options": options},
    )
    assert response.status_code == 422


def test_create_rating_invalid_range(client, db_session, auth_headers):
    """Test creating rating with invalid min/max."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Rating Invalid", "description": ""},
    )
    survey_id = create_response.json()["id"]

    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={
            "text": "Bad rating?",
            "question_type": "rating",
            "min": 6,
            "max": 3,
        },
    )
    assert response.status_code == 422


def test_get_questions_ordered(client, db_session, auth_headers):
    """Test getting questions ordered by position."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Order Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    # Add 3 questions (Q1 first, Q2 second, Q3 third)
    q1 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q1", "question_type": "short_text"},
    ).json()
    q2 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q2", "question_type": "short_text"},
    ).json()
    q3 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q3", "question_type": "short_text"},
    ).json()

    response = client.get(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data["questions"]) == 3
    # Should be ordered by position: Q1 (pos 0), Q2 (pos 1), Q3 (pos 2)
    assert data["questions"][0]["text"] == "Q1"
    assert data["questions"][0]["position"] == 0
    assert data["questions"][1]["text"] == "Q2"
    assert data["questions"][1]["position"] == 1
    assert data["questions"][2]["text"] == "Q3"
    assert data["questions"][2]["position"] == 2


def test_move_question_up(client, db_session, auth_headers):
    """Test moving a question up."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Move Up Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    # Add 3 questions
    q1 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q1", "question_type": "short_text"},
    ).json()
    q2 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q2", "question_type": "short_text"},
    ).json()
    q3 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q3", "question_type": "short_text"},
    ).json()

    # Move Q2 up
    response = client.patch(
        f"/api/surveys/{survey_id}/questions/{q2['id']}/move-up",
        headers=auth_headers,
    )
    assert response.status_code == 200
    moved = response.json()
    assert moved["position"] == 0

    # Verify order
    response = client.get(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
    )
    data = response.json()
    assert data["questions"][0]["text"] == "Q2"
    assert data["questions"][1]["text"] == "Q1"
    assert data["questions"][2]["text"] == "Q3"


def test_move_question_down(client, db_session, auth_headers):
    """Test moving a question down."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Move Down Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    q1 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q1", "question_type": "short_text"},
    ).json()
    q2 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q2", "question_type": "short_text"},
    ).json()
    q3 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q3", "question_type": "short_text"},
    ).json()

    # Move Q1 down
    response = client.patch(
        f"/api/surveys/{survey_id}/questions/{q1['id']}/move-down",
        headers=auth_headers,
    )
    assert response.status_code == 200

    # Verify order
    response = client.get(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
    )
    data = response.json()
    assert data["questions"][0]["text"] == "Q2"
    assert data["questions"][1]["text"] == "Q3"
    assert data["questions"][2]["text"] == "Q1"


def test_move_question_up_already_top(client, db_session, auth_headers):
    """Test moving up when already at top."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Top Move Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    q = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Only Question", "question_type": "short_text"},
    ).json()

    response = client.patch(
        f"/api/surveys/{survey_id}/questions/{q['id']}/move-up",
        headers=auth_headers,
    )
    assert response.status_code == 400


def test_move_question_down_already_bottom(client, db_session, auth_headers):
    """Test moving down when already at bottom."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Bottom Move Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    q = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Only Question", "question_type": "short_text"},
    ).json()

    response = client.patch(
        f"/api/surveys/{survey_id}/questions/{q['id']}/move-down",
        headers=auth_headers,
    )
    assert response.status_code == 400


def test_reorder_questions(client, db_session, auth_headers):
    """Test bulk reorder of questions."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Reorder Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    q1 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q1", "question_type": "short_text"},
    ).json()
    q2 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q2", "question_type": "short_text"},
    ).json()
    q3 = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q3", "question_type": "short_text"},
    ).json()

    # Reorder: Q3, Q1, Q2
    response = client.patch(
        f"/api/surveys/{survey_id}/questions/reorder",
        headers=auth_headers,
        params={"question_ids": [q3["id"], q1["id"], q2["id"]]},
    )
    assert response.status_code == 200

    # Verify order
    response = client.get(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
    )
    data = response.json()
    assert data["questions"][0]["text"] == "Q3"
    assert data["questions"][1]["text"] == "Q1"
    assert data["questions"][2]["text"] == "Q2"


def test_reorder_questions_invalid_id(client, db_session, auth_headers):
    """Test reorder with an invalid question ID."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Reorder Invalid", "description": ""},
    )
    survey_id = create_response.json()["id"]

    client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": "Q1", "question_type": "short_text"},
    )

    response = client.patch(
        f"/api/surveys/{survey_id}/questions/reorder",
        headers=auth_headers,
        params={"question_ids": [99999]},
    )
    assert response.status_code == 404


def test_short_text_too_long(client, db_session, auth_headers):
    """Test creating short text question with text exceeding 500 chars."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Long Text Test", "description": ""},
    )
    survey_id = create_response.json()["id"]

    long_text = "x" * 501
    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": long_text, "question_type": "short_text"},
    )
    assert response.status_code == 422


def test_long_text_too_long(client, db_session, auth_headers):
    """Test creating long text question with text exceeding 2000 chars."""
    create_response = client.post(
        "/api/surveys",
        headers=auth_headers,
        json={"title": "Long Text Too Long", "description": ""},
    )
    survey_id = create_response.json()["id"]

    long_text = "x" * 2001
    response = client.post(
        f"/api/surveys/{survey_id}/questions",
        headers=auth_headers,
        json={"text": long_text, "question_type": "long_text"},
    )
    assert response.status_code == 422


def test_get_questions_not_found(client, db_session, auth_headers):
    """Test getting questions for non-existent survey."""
    response = client.get(
        "/api/surveys/99999/questions",
        headers=auth_headers,
    )
    assert response.status_code == 404
