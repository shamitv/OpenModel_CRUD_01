# Phase 1-1: Backend Foundation — To-Do

## Tasks

### C1 — Backend skeleton and FastAPI app
- [x] Create backend/ directory structure
- [x] Create backend/app/main.py with FastAPI app, CORS, logging
- [x] Create backend/app/config.py with environment-based config
- [x] Create backend/requirements.txt with pinned versions
- [x] Create backend/alembic.ini and Alembic env.py
- [x] Create backend/alembic/versions/ directory
- **Commit**: `feat: initialize FastAPI backend skeleton`

### C2 — SQLAlchemy configuration and base models
- [x] Create backend/app/database.py with engine, session, base
- [x] Create backend/app/models/__init__.py
- [x] Create backend/app/models/user.py (User model)
- [x] Create backend/app/models/survey.py (Survey model)
- [x] Create backend/app/models/question.py (Question model)
- [x] Create backend/app/models/response.py (Response/Answer models)
- **Commit**: `feat: add SQLAlchemy config and core models`

### C3 — Alembic migrations
- [x] Create initial migration to create all tables
- [x] Run `alembic upgrade head` to verify
- **Commit**: `feat: add initial Alembic migration`

### C4 — Environment and project hygiene
- [x] Create/update backend/.env with SECRET_KEY, DATABASE_URI, PORT
- [x] Update backend/.gitignore entries
- [x] Update root .gitignore with backend entries
- **Commit**: `chore: configure backend environment and gitignore`

### C5 — Verification
- [x] Start backend with `uvicorn app.main:app --reload --port 6030`
- [x] Verify app responds on localhost:6030
- **Commit**: `chore: verify backend starts successfully`
