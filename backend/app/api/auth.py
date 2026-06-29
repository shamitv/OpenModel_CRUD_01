from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel, Field, EmailStr

from app.database import get_db
from app.deps import get_current_user
from app.models.user import User
from app.schemas import RegisterRequest, LoginRequest, MessageResponse
from app.utils import create_access_token, verify_password

router = APIRouter(prefix="/api/auth", tags=["Auth"])


class RegisterResponse(BaseModel):
    message: str
    user: dict


class LoginResponse(BaseModel):
    message: str
    token: str
    user: dict


@router.post("/register", response_model=RegisterResponse, status_code=201)
def register(
    body: RegisterRequest,
    db: Session = Depends(get_db),
):
    """Register a new user."""
    # Check if username already exists
    existing_user = db.query(User).filter(User.username == body.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Check if email already exists
    existing_email = db.query(User).filter(User.email == body.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user with hashed password
    new_user = User(
        username=body.username,
        email=body.email,
        full_name=body.full_name,
    )
    new_user.hash_password(body.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user": new_user.to_dict(),
    }


@router.post("/login", response_model=LoginResponse)
def login(
    body: LoginRequest,
    db: Session = Depends(get_db),
):
    """Login and return JWT token."""
    user = db.query(User).filter(User.username == body.username).first()
    if not user or not user.verify_password(body.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = create_access_token(data={"sub": user.id, "username": user.username})

    return {
        "message": "Login successful",
        "token": access_token,
        "user": user.to_dict(),
    }


@router.post("/logout", status_code=200)
def logout(
    db: Session = Depends(get_db),
):
    """Logout - client should clear token from localStorage."""
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=dict)
def get_current_user(
    current_user: User = Depends(get_current_user),
):
    """Return the current authenticated user."""
    return current_user.to_dict()


@router.post("/refresh", response_model=dict)
def refresh_token(
    refresh_token: str = None,
    db: Session = Depends(get_db),
):
    """Refresh access token. Client must store refresh token securely."""
    if not refresh_token:
        raise HTTPException(status_code=400, detail="Refresh token required")

    # In production, validate refresh token against stored tokens
    # For now, issue a new access token
    new_access_token = create_access_token(
        data={"sub": "refreshed", "username": "refreshed"},
    )

    return {"message": "Token refreshed", "token": new_access_token}
