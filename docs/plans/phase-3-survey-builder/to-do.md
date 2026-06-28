# Phase 3: Survey Builder — To-Do

## Tasks

### C1 — Survey creation API
- [ ] Create GET /api/surveys and POST /api/surveys endpoints
- [ ] Implement survey create with title and description
- **Commit after completion**: `feat: add survey creation API`

### C2 — Question type models and validation
- [ ] Create Pydantic schemas for each question type
- [ ] Implement question creation API (POST /api/surveys/{id}/questions)
- **Commit after completion**: `feat: add question creation API with type schemas`

### C3 — Multiple choice and rating questions
- [ ] Implement multiple choice question with options array
- [ ] Implement rating scale question with min/max/range
- **Commit after completion**: `feat: add multiple choice and rating question support`

### C4 — Text questions
- [ ] Implement short text and long text question types
- **Commit after completion**: `feat: add text question support`

### C5 — Question ordering
- [ ] Implement reorder/move up/down endpoints
- [ ] Update frontend to support drag-and-drop or button-based reordering
- **Commit after completion**: `feat: add question reordering`

### C6 — Survey builder UI
- [ ] Create src/components/SurveyBuilder.jsx
- [ ] Build question card components for each type
- **Commit after completion**: `feat: add survey builder UI`

### C7 — Preview mode
- [ ] Implement survey preview component
- [ ] Show survey as respondent would see it
- **Commit after completion**: `feat: add survey preview`

### C8 — Verification
- [ ] Run Playwright survey-builder tests
- **Commit after completion**: `test: verify survey builder functionality`
