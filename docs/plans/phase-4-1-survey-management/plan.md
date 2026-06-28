# Phase 4-1: Survey Management

## Overview
Implement the survey management dashboard: list surveys, edit, delete, and manage active/closed status.

## Scope
- Dashboard API listing user surveys
- Dashboard UI with survey cards
- Edit survey flow
- Delete survey flow
- Active/closed status management

## Commit Checkpoints

### C1 — Dashboard API
- Create GET /api/surveys/my endpoint
- Filter surveys by current user ownership
- **Commit**: `feat: add dashboard API`

### C2 — Dashboard UI
- Create src/pages/Dashboard.jsx
- Display survey cards with title, question count, status
- **Commit**: `feat: add dashboard UI`

### C3 — Edit survey flow
- Create src/pages/EditSurvey.jsx
- Load survey from API, allow modifications
- **Commit**: `feat: add edit survey flow`

### C4 — Delete survey flow
- Add delete button to dashboard and edit view
- Implement DELETE /api/surveys/{id} endpoint
- Confirm before delete with modal
- **Commit**: `feat: add delete survey flow`

### C5 — Status management
- Implement PUT /api/surveys/{id}/status endpoint
- Add toggle active/closed UI control
- **Commit**: `feat: add status management`

### C6 — Verification
- Run Playwright survey-management tests
- **Commit**: `test: verify survey management`
