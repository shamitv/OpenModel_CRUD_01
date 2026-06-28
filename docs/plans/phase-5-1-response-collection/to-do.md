# Phase 5-1: Response Collection — To-Do

## Tasks

### C1 — Response submission API
- [ ] Create POST /api/surveys/{id}/responses endpoint
- [ ] Implement Pydantic validation schema for responses
- **Commit after completion**: `feat: add response submission API`

### C2 — Answer persistence
- [ ] Create POST /api/responses/{id}/answers endpoint
- [ ] Persist per-question answers
- **Commit after completion**: `feat: add answer persistence`

### C3 — Respondent form validation
- [ ] Validate required fields per question type
- [ ] Show validation errors to respondent
- **Commit after completion**: `feat: add response form validation`

### C4 — Respondent UI
- [ ] Create src/pages/RespondentForm.jsx
- [ ] Dynamically render questions based on survey data
- [ ] Show success state after submission
- **Commit after completion**: `feat: add respondent form UI`

### C5 — Admin seeding UI
- [ ] Create admin seed control in dashboard
- [ ] Load demo surveys from docs/plans/survey_studio_demo_surveys.md
- **Commit after completion**: `feat: add admin seeding UI`

### C6 — Verification
- [ ] Run Playwright responses tests
- **Commit after completion**: `test: verify response collection`
