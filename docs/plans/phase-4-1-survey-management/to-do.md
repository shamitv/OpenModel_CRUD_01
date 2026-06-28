# Phase 4-1: Survey Management — To-Do

## Tasks

### C1 — Dashboard API
- [ ] Create GET /api/surveys/my endpoint
- [ ] Filter surveys by current user ownership
- **Commit after completion**: `feat: add dashboard API`

### C2 — Dashboard UI
- [ ] Create src/pages/Dashboard.jsx
- [ ] Display survey cards with title, question count, status
- **Commit after completion**: `feat: add dashboard UI`

### C3 — Edit survey flow
- [ ] Create src/pages/EditSurvey.jsx
- [ ] Load survey from API, allow modifications
- **Commit after completion**: `feat: add edit survey flow`

### C4 — Delete survey flow
- [ ] Add delete button to dashboard and edit view
- [ ] Implement DELETE /api/surveys/{id} endpoint
- [ ] Confirm before delete with modal
- **Commit after completion**: `feat: add delete survey flow`

### C5 — Status management
- [ ] Implement PUT /api/surveys/{id}/status endpoint
- [ ] Add toggle active/closed UI control
- **Commit after completion**: `feat: add status management`

### C6 — Verification
- [ ] Run Playwright survey-management tests
- **Commit after completion**: `test: verify survey management`
