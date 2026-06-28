from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.user import User
from app.utils import create_access_token, verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=dict, status_code=201)
def register(
    username: str,
    email: str,
    password: str,
    db: Session = Depends(get_db),
):
    """Register a new user."""
    # Check if username already exists
    existing_user = db.query(User).filter(User.username == username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Check if email already exists
    existing_email = db.query(User).filter(User.email == email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user
    new_user = User(
        username=username,
        email=email,
        hashed_password=password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user": new_user.to_dict(),
    }


@router.post("/login", response_model=dict)
def login(
    username: str,
    password: str,
    db: Session = Depends(get_db),
):
    """Login and return JWT token."""
    user = db.query(User).filter(User.username == username).first()
    if not user or not user.verify_password(password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = create_access_token(data={"sub": user.id, "username": user.username})

    return {
        "message": "Login successful",
        "token": access_token,
        "user": user.to_dict(),
    }


@router.post("/logout", status_code=200)
def logout(
    token: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """Logout - client should clear token from localStorage."""
    return {"message": "Logged out successfully"}
