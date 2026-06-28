# Project Roadmap: Survey Studio

## Overview
A web application for creating, distributing, and analyzing surveys. Built with React + Tailwind CSS (frontend) and FastAPI + SQLAlchemy (backend).

## Architecture

```
C:\work\OpenModel_CRUD_01\
+-- backend/          # FastAPI + SQLAlchemy backend
+-- frontend/         # React + Vite + Tailwind CSS frontend
+-- docs/plans/       # Planning documents
|   +-- appl_plan.md           # Main application plan
|   +-- DESIGN.md              # Visual design system
|   +-- survey_studio_demo_surveys.md  # Demo survey bank
|   +-- roadmap.md             # This file
|   +-- phase-*/               # Phase plans
|       +-- plan.md
|       +-- status.md
|       +-- to-do.md
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Tailwind CSS, Zustand |
| Backend | Python (FastAPI), SQLAlchemy |
| Database | SQLite (dev), PostgreSQL (production) |
| Auth | JWT-based |
| Testing | Pytest (backend), Playwright (E2E) |
| Port | 6030 |

## Phase Roadmap

### Phase 1-1: Backend Foundation
**Status**: completed
**Files**: `docs/plans/phase-1-1-backend-foundation/`
- FastAPI app skeleton, SQLAlchemy config, Alembic migrations, env setup
- **5 checkpoints**: C1 (skeleton) -> C2 (models) -> C3 (migrations) -> C4 (env) -> C5 (verify)

### Phase 1-2: Frontend Foundation
**Status**: completed
**Files**: `docs/plans/phase-1-2-frontend-foundation/`
- React/Vite project, Tailwind CSS, Zustand, app shell, smoke test
- **5 checkpoints**: C1 (deps) -> C2 (Tailwind) -> C3 (stores/routing) -> C4 (layout) -> C5 (smoke test)

### Phase 2-1: Backend Authentication
**Status**: pending
**Files**: `docs/plans/phase-2-1-backend-auth/`
- Registration, login, password hashing, JWT, protected routes
- **5 checkpoints**: C1 (password hashing) -> C2 (auth endpoints) -> C3 (JWT) -> C4 (middleware) -> C5 (verify)

### Phase 2-2: Frontend Authentication
**Status**: pending
**Files**: `docs/plans/phase-2-2-frontend-auth/`
- Auth forms, Zustand auth store, styled auth screens
- **6 checkpoints**: C1 (API service) -> C2 (auth store) -> C3 (register form) -> C4 (login form) -> C5 (screens) -> C6 (styling)

### Phase 3: Survey Builder
**Status**: pending
**Files**: `docs/plans/phase-3-survey-builder/`
- Survey creation, question types, reordering, preview
- **8 checkpoints**: C1 (survey API) -> C2 (question types) -> C3 (choice/rating) -> C4 (text) -> C5 (reorder) -> C6 (UI) -> C7 (preview) -> C8 (verify)

### Phase 4-1: Survey Management
**Status**: pending
**Files**: `docs/plans/phase-4-1-survey-management/`
- Dashboard, edit, delete, active/closed status
- **6 checkpoints**: C1 (dashboard API) -> C2 (dashboard UI) -> C3 (edit) -> C4 (delete) -> C5 (status) -> C6 (verify)

### Phase 4-2: Survey Distribution
**Status**: pending
**Files**: `docs/plans/phase-4-2-survey-distribution/`
- Shareable URLs, public respondent view, URL validation
- **5 checkpoints**: C1 (URL generation) -> C2 (public API) -> C3 (respondent UI) -> C4 (validation) -> C5 (verify)

### Phase 5-1: Response Collection
**Status**: pending
**Files**: `docs/plans/phase-5-1-response-collection/`
- Response submission, validation, persistence, respondent UI
- **6 checkpoints**: C1 (submission API) -> C2 (answer persistence) -> C3 (validation) -> C4 (respondent UI) -> C5 (admin seeding) -> C6 (verify)

### Phase 5-2: Admin Seeding
**Status**: pending
**Files**: `docs/plans/phase-5-2-admin-seeding/`
- Demo survey seeding, bulk response generation (500-800)
- **5 checkpoints**: C1 (data loader) -> C2 (seed UI) -> C3 (seeding API) -> C4 (bulk gen) -> C5 (verify)

### Phase 6-1: Analytics API and Charts
**Status**: pending
**Files**: `docs/plans/phase-6-1-analytics-api-charts/`
- Analytics API, response counting, Chart.js, per-question panels
- **6 checkpoints**: C1 (analytics API) -> C2 (counting) -> C3 (Chart.js) -> C4 (panels) -> C5 (dashboard) -> C6 (verify)

### Phase 6-2: Realtime Counts and Bulk Generation
**Status**: pending
**Files**: `docs/plans/phase-6-2-realtime-bulk/`
- Realtime counting (polling/WebSockets), bulk generation, admin UI
- **5 checkpoints**: C1 (realtime) -> C2 (bulk API) -> C3 (type-correct answers) -> C4 (admin UI) -> C5 (verify)

### Phase 7-1: Security
**Status**: pending
**Files**: `docs/plans/phase-7-1-security/`
- Rate limiting, access control, ownership checks, validation hardening
- **5 checkpoints**: C1 (rate limiting) -> C2 (access control) -> C3 (validation) -> C4 (error states) -> C5 (verify)

### Phase 7-2: Validation and Polish
**Status**: pending
**Files**: `docs/plans/phase-7-2-validation-polish/`
- Comprehensive validation, UI states, responsive/accessibility audit
- **5 checkpoints**: C1 (validation) -> C2 (UI states) -> C3 (responsive/Accessibility) -> C4 (DESIGN audit) -> C5 (verify)

### Phase 8: Final Verification
**Status**: pending
**Files**: `docs/plans/phase-8-final-verification/`
- Backend tests, frontend build, full Playwright suite, E2E flows
- **6 checkpoints**: C1 (backend tests) -> C2 (frontend build) -> C3 (Playwright) -> C4 (E2E flows) -> C5 (DESIGN audit) -> C6 (release notes)

## Implementation Order

```
Phase 1-1 -> Phase 1-2 -> Phase 2-1 -> Phase 2-2 -> Phase 3
-> Phase 4-1 -> Phase 4-2 -> Phase 5-1 -> Phase 5-2
-> Phase 6-1 -> Phase 6-2 -> Phase 7-1 -> Phase 7-2 -> Phase 8
```

## Status Summary

| Phase | Status |
|-------|--------|
| Phase 1-1: Backend Foundation | completed |
| Phase 1-2: Frontend Foundation | completed |
| Phase 2-1: Backend Authentication | pending |
| Phase 2-2: Frontend Authentication | pending |
| Phase 3: Survey Builder | pending |
| Phase 4-1: Survey Management | pending |
| Phase 4-2: Survey Distribution | pending |
| Phase 5-1: Response Collection | pending |
| Phase 5-2: Admin Seeding | pending |
| Phase 6-1: Analytics API and Charts | pending |
| Phase 6-2: Realtime Counts and Bulk Generation | pending |
| Phase 7-1: Security | pending |
| Phase 7-2: Validation and Polish | pending |
| Phase 8: Final Verification | pending |

## Notes

- Stage 0 (Repo Bootstrap) is skipped as the repository already exists with plans and configuration.
- Each phase follows the commit discipline from AGENTS.md: commit early, commit often, commit after each meaningful change.
- Design system source of truth: `docs/plans/DESIGN.md`.
- Demo survey bank: `docs/plans/survey_studio_demo_surveys.md`.
- Port 6030 is reserved for local backend API runs.
