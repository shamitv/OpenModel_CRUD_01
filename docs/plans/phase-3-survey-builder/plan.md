# Phase 3: Survey Builder

## Overview
Implement the survey builder: create surveys, add questions of different types, reorder questions, and preview the survey.

## Scope
- Survey creation API and frontend
- Question type support: multiple choice, short text, long text, rating
- Question ordering (reorder/move up/down)
- Survey preview mode
- Save/publish state management

## Commit Checkpoints

### C1 — Survey creation API
- Create GET /api/surveys and POST /api/surveys endpoints
- Implement survey create with title and description
- **Commit**: `feat: add survey creation API`

### C2 — Question type models and validation
- Create Pydantic schemas for each question type
- Implement question creation API (POST /api/surveys/{id}/questions)
- **Commit**: `feat: add question creation API with type schemas`

### C3 — Multiple choice and rating questions
- Implement multiple choice question with options array
- Implement rating scale question with min/max/range
- **Commit**: `feat: add multiple choice and rating question support`

### C4 — Text questions
- Implement short text and long text question types
- **Commit**: `feat: add text question support`

### C5 — Question ordering
- Implement reorder/move up/down endpoints
- Update frontend to support drag-and-drop or button-based reordering
- **Commit**: `feat: add question reordering`

### C6 — Survey builder UI
- Create src/components/SurveyBuilder.jsx
- Build question card components for each type
- **Commit**: `feat: add survey builder UI`

### C7 — Preview mode
- Implement survey preview component
- Show survey as respondent would see it
- **Commit**: `feat: add survey preview`

### C8 — Verification
- Run Playwright survey-builder tests
- **Commit**: `test: verify survey builder functionality`
