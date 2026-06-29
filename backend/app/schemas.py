import re
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List


class RegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: str = Field(..., max_length=100)
    password: str = Field(..., min_length=6)
    full_name: Optional[str] = Field(None, max_length=100)


class LoginRequest(BaseModel):
    username: str = Field(..., min_length=1, max_length=50)
    password: str = Field(..., min_length=1)


class TokenResponse(BaseModel):
    message: str
    token: str
    user: dict


class MessageResponse(BaseModel):
    message: str


# --- Survey Schemas ---

def slugify(text: str) -> str:
    """Convert text to a URL-friendly slug: lowercase, replace spaces with hyphens, strip special chars."""
    slug = re.sub(r'[^a-z0-9]+', '-', text.lower().strip())
    return slug.strip('-')


class SurveyCreateRequest(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=2000)


class SurveyUpdateRequest(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=2000)
    status: Optional[str] = Field(None, max_length=20)


class SurveyResponse(BaseModel):
    id: int
    creator_id: int
    title: str
    description: Optional[str]
    slug: str
    status: str
    created_at: Optional[str]
    updated_at: Optional[str]
    question_count: int


class SurveyListResponse(BaseModel):
    surveys: List[SurveyResponse]
    total: int
    page: int
    page_size: int


# --- Question Schemas ---

class QuestionCreateRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    question_type: str = Field(...)
    required: bool = False
    options: Optional[List[str]] = None
    min: Optional[int] = None
    max: Optional[int] = None

    @field_validator('question_type')
    @classmethod
    def validate_question_type(cls, v: str) -> str:
        allowed = {'multiple_choice', 'short_text', 'long_text', 'rating'}
        if v not in allowed:
            raise ValueError(f'question_type must be one of {allowed}')
        return v


class QuestionUpdateRequest(BaseModel):
    text: Optional[str] = Field(None, min_length=1, max_length=500)
    question_type: Optional[str] = Field(None)
    required: Optional[bool] = None
    options: Optional[List[str]] = None
    min: Optional[int] = None
    max: Optional[int] = None

    @field_validator('question_type')
    @classmethod
    def validate_question_type(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            allowed = {'multiple_choice', 'short_text', 'long_text', 'rating'}
            if v not in allowed:
                raise ValueError(f'question_type must be one of {allowed}')
        return v


class QuestionResponse(BaseModel):
    id: int
    survey_id: int
    text: str
    question_type: str
    position: int
    required: bool
    options: Optional[List[str]]
    min: Optional[int]
    max: Optional[int]
    created_at: Optional[str]


class QuestionListResponse(BaseModel):
    questions: List[QuestionResponse]


# --- Auth Schemas ---

class RegisterResponse(BaseModel):
    message: str
    user: dict


class LoginResponse(BaseModel):
    message: str
    token: str
    user: dict
