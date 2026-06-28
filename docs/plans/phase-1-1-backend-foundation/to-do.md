# Phase 1-1: Backend Foundation — To-Do

## Tasks

### C1 — Backend skeleton and FastAPI app
- [ ] Create backend/ directory structure
- [ ] Create backend/app/main.py with FastAPI app, CORS, logging
- [ ] Create backend/app/config.py with environment-based config
- [ ] Create backend/requirements.txt with pinned versions
- [ ] Create backend/alembic.ini and Alembic env.py
- [ ] Create backend/alembic/versions/ directory
- **Commit after completion**: `feat: initialize FastAPI backend skeleton`

### C2 — SQLAlchemy configuration and base models
- [ ] Create backend/app/database.py with engine, session, base
- [ ] Create backend/app/models/__init__.py
- [ ] Create backend/app/models/user.py (User model)
- [ ] Create backend/app/models/survey.py (Survey model)
- [ ] Create backend/app/models/question.py (Question model)
- [ ] Create backend/app/models/response.py (Response/Answer models)
- **Commit after completion**: `feat: add SQLAlchemy config and core models`

### C3 — Alembic migrations
- [ ] Create initial migration to create all tables
- [ ] Run `alembic upgrade head` to verify
- **Commit after completion**: `feat: add initial Alembic migration`

### C4 — Environment and project hygiene
- [ ] Create/update backend/.env with SECRET_KEY, DATABASE_URI, PORT
- [ ] Update backend/.gitignore entries
- [ ] Update root .gitignore with backend entries
- **Commit after completion**: `chore: configure backend environment and gitignore`

### C5 — Verification
- [ ] Start backend with `uvicorn app.main:app --reload --port 6030`
- [ ] Verify app responds on localhost:6030
- **Commit after completion**: `chore: verify backend starts successfully`
