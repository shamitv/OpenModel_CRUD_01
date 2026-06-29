import pytest
import tempfile
import os
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.main import app
from app.database import Base, engine, SessionLocal, get_db
from app.models import User
from app.utils import hash_password


@pytest.fixture(scope="function")
def db_session():
    """Create a completely fresh SQLite database file for each test.

    Directly patches app.database to use a temp file database,
    ensuring full isolation from the production survey_app.db.
    """
    fd, db_path = tempfile.mkstemp(suffix=".db")
    os.close(fd)

    # Create fresh engine and session factory
    test_engine = create_engine(
        f"sqlite:///{db_path}",
        connect_args={"check_same_thread": False},
    )
    test_session_factory = sessionmaker(
        autocommit=False, autoflush=False, bind=test_engine,
    )

    # Patch app.database directly
    import app.database as db_module
    db_module.engine = test_engine
    db_module.SessionLocal = test_session_factory

    Base.metadata.create_all(bind=test_engine)

    yield test_session_factory()

    # Restore original
    db_module.engine = engine
    db_module.SessionLocal = SessionLocal
    try:
        os.unlink(db_path)
    except OSError:
        pass


@pytest.fixture(scope="function")
def client(db_session):
    """Create a test client with fresh database."""
    return TestClient(app)


@pytest.fixture
def valid_credentials(client, db_session):
    """Register a test user and return credentials."""
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


# --- Registration Tests ---

def test_register_success(client, db_session):
    """Test successful user registration."""
    response = client.post(
        "/api/auth/register",
        json={
            "username": "newuser1",
            "email": "new1@example.com",
            "password": "securepass123",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["message"] == "User registered successfully"
    assert "user" in data
    assert data["user"]["username"] == "newuser1"
    assert data["user"]["email"] == "new1@example.com"
    assert "hashed_password" not in data["user"]


def test_register_duplicate_username(client, db_session, valid_credentials):
    """Test duplicate username registration returns 400."""
    response = client.post(
        "/api/auth/register",
        json={
            "username": valid_credentials["username"],
            "email": "other@example.com",
            "password": "anotherpass",
        },
    )
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"].lower()


def test_register_duplicate_email(client, db_session, valid_credentials):
    """Test duplicate email registration returns 400."""
    response = client.post(
        "/api/auth/register",
        json={
            "username": "otheruser",
            "email": valid_credentials["email"],
            "password": "anotherpass",
        },
    )
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"].lower()


def test_register_missing_fields(client, db_session):
    """Test registration with missing required fields."""
    response = client.post(
        "/api/auth/register",
        json={"username": "testuser"},
    )
    assert response.status_code == 422


def test_register_short_password(client, db_session):
    """Test registration with password shorter than minimum."""
    response = client.post(
        "/api/auth/register",
        json={
            "username": "testuser2",
            "email": "test2@example.com",
            "password": "abc",
        },
    )
    assert response.status_code == 422


# --- Login Tests ---

def test_login_success(client, db_session, valid_credentials):
    """Test successful login returns JWT token."""
    response = client.post(
        "/api/auth/login",
        json={
            "username": valid_credentials["username"],
            "password": valid_credentials["password"],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Login successful"
    assert "token" in data
    assert "user" in data
    assert data["user"]["username"] == valid_credentials["username"]
    assert len(data["token"]) > 0


def test_login_wrong_password(client, db_session, valid_credentials):
    """Test login with wrong password returns 401."""
    response = client.post(
        "/api/auth/login",
        json={
            "username": valid_credentials["username"],
            "password": "wrongpassword",
        },
    )
    assert response.status_code == 401
    assert "invalid" in response.json()["detail"].lower()


def test_login_nonexistent_user(client, db_session):
    """Test login with nonexistent user returns 401."""
    response = client.post(
        "/api/auth/login",
        json={
            "username": "nonexistent",
            "password": "password",
        },
    )
    assert response.status_code == 401


def test_login_missing_fields(client, db_session):
    """Test login with missing required fields."""
    response = client.post(
        "/api/auth/login",
        json={"username": "testuser"},
    )
    assert response.status_code == 422


# --- Protected Route Tests ---

def test_protected_route_unauthenticated(client, db_session):
    """Test that protected route returns 401 without token."""
    response = client.get("/api/auth/me")
    assert response.status_code == 401


def test_protected_route_with_valid_token(client, db_session, valid_credentials):
    """Test that protected route works with valid JWT token."""
    login_response = client.post(
        "/api/auth/login",
        json={
            "username": valid_credentials["username"],
            "password": valid_credentials["password"],
        },
    )
    token = login_response.json()["token"]
    response = client.get(
        "/api/auth/me", headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == valid_credentials["username"]


def test_protected_route_with_invalid_token(client, db_session):
    """Test that protected route rejects invalid token."""
    response = client.get(
        "/api/auth/me", headers={"Authorization": "Bearer invalidtoken"}
    )
    assert response.status_code == 401


# --- Logout Tests ---

def test_logout(client, db_session, valid_credentials):
    """Test logout endpoint."""
    response = client.post("/api/auth/logout")
    assert response.status_code == 200
    assert response.json()["message"] == "Logged out successfully"


# --- Password Hashing Tests ---

def test_password_is_hashed_in_database(client, db_session):
    """Test that passwords are stored as bcrypt hashes, not plaintext."""
    username = "hashcheck"
    email = "hashcheck@example.com"
    password = "mypass123"

    response = client.post(
        "/api/auth/register",
        json={"username": username, "email": email, "password": password},
    )
    assert response.status_code == 201

    db_user = db_session.query(User).filter(User.username == username).first()
    assert db_user is not None
    assert db_user.hashed_password != password
    assert db_user.verify_password(password)
