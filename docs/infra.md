# Infrastructure

## Architecture Overview

```
Frontend (Vite :5173)  ──proxy──>  Backend (FastAPI :6030)  ──>  SQLite
```

- **Frontend**: Vite dev server serving a React SPA on port 5173.
  Proxies `/api/*` requests to the backend.
- **Backend**: FastAPI application served by uvicorn on port 6030.
- **Database**: SQLite file at `backend/survey_app.db`.

---

## Backend

### Prerequisites

- Python 3.12+
- Virtual environment (see setup below)

### Setup

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment (platform-specific):

- **Windows (cmd)**: `.venv\Scripts\activate`
- **Windows (PowerShell)**: `.venv\Scripts\Activate.ps1`
- **macOS / Linux**: `source .venv/bin/activate`

Install dependencies:

```bash
cd backend
# With venv activated
pip install -r requirements.txt
```

### Environment

Configuration is read from `backend/.env`. Key variables:

| Variable | Default | Description |
|---|---|---|
| `SECRET_KEY` | `replace-with-a-local-secret` | JWT signing key (change in production) |
| `BACKEND_PORT` | `6030` | Port the backend listens on |
| `SQLALCHEMY_DATABASE_URI` | `sqlite:///./survey_app.db` | Database connection string |
| `ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | JWT token lifetime |

### Start

```bash
cd backend
# With venv activated
uvicorn app.main:app --port 6030 --reload
```

- Remove `--reload` in production.
- The server starts and prints startup logs to stderr.
- Health check: `GET http://localhost:6030/health`

### Stop

Press `Ctrl+C` in the terminal where the server is running.

### Database Migrations

```bash
cd backend
# With venv activated
alembic upgrade head       # Apply pending migrations
alembic revision --autogenerate -m "description"   # Create a new migration
```

### Tests

```bash
cd backend
# With venv activated
pytest
```

---

## Frontend

### Prerequisites

- Node.js 18+
- npm (bundled with Node.js)

### Setup

```bash
cd frontend
npm install
```

### Start (development server)

```bash
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

Or using the helper script:

```bash
cd frontend
python scripts/start_server.py
```

The helper script (`frontend/scripts/start_server.py`) is Python-based and:
- Changes the working directory to the frontend root
- Finds `npm` on the system PATH
- Runs `npm run dev -- --host 127.0.0.1 --port 5173`

If no port is specified, Vite defaults to port 5173 and auto-increments if busy.

### Build (production)

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/`.

### Preview (production build locally)

```bash
cd frontend
npm run preview
```

### Stop

Press `Ctrl+C` in the terminal where the dev server is running.

### Tests

```bash
cd frontend
npx playwright test tests/smoke.spec.js --project=chromium
npx playwright test tests/builder.spec.js --project=chromium
npx playwright test tests/             # Run all tests
```

---

## Database

The project uses **SQLite** stored at `backend/survey_app.db`.

- No separate database server to start/stop.
- Schema managed via **Alembic** migrations (see [Migrations](#database-migrations)).
- Configuration via `backend/.env` (see [Environment](#environment)).

---

## Running Both Servers

For full-stack development, start both the backend and frontend in separate terminals:

| Terminal | Command |
|---|---|
| Terminal 1 (Backend) | `cd backend` → activate venv → `uvicorn app.main:app --port 6030 --reload` |
| Terminal 2 (Frontend) | `cd frontend` → `npm run dev` |

The frontend dev server proxies `/api/*` requests to `http://localhost:6030`.

---

## Health Checks

| Component | Endpoint | Expected Response |
|---|---|---|
| Backend | `GET http://localhost:6030/health` | `{"status": "ok"}` |
| Frontend | `GET http://localhost:5173/` | SPA HTML document (200) |
| Frontend | `GET http://localhost:5173/login` | SPA HTML document (200) |
