# Phase 3: Survey Builder — Granular Implementation Plan

## Overview
Implement the complete survey builder: CRUD APIs for surveys and questions, type-specific validation, question reordering, builder UI with three-zone layout, and preview mode. This phase builds on Phase 1-1 (backend foundation), Phase 1-2 (frontend foundation), and Phase 2-1/2-2 (authentication).

## Architecture

```
Phase 3: Survey Builder
|
+-- C1: Survey CRUD API
|   |  C1a: Survey schemas and slug generation
|   |  C1b: GET /api/surveys/my (list with pagination)
|   |  C1c: POST /api/surveys (create with auto-slug)
|   |  C1d: GET /api/surveys/{id} (full survey with nested questions)
|   |  C1e: PUT /api/surveys/{id} (update title, description, status)
|   |  C1f: DELETE /api/surveys/{id} (cascade delete)
|
+-- C2: Question Type Validation
|   |  C2a: Define question_type enum (multiple_choice, short_text, long_text, rating)
|   |  C2b: QuestionRequest schema with type-specific fields
|   |  C2c: Validation (unique options, rating range, text length)
|
+-- C3: Multiple Choice and Rating Endpoints
|   |  C3a: POST /api/surveys/{id}/questions (general)
|   |  C3b: Multiple choice validation (unique options, max 10)
|   |  C3c: Rating validation (min 1, max 5)
|
+-- C4: Text Question Endpoints
|   |  C4a: Short text question (max 500 chars)
|   |  C4b: Long text question (max 2000 chars)
|
+-- C5: Question Ordering
|   |  C5a: GET /api/surveys/{id}/questions (ordered by position)
|   |  C5b: PATCH /api/surveys/{id}/questions/reorder (bulk reorder)
|   |  C5c: PATCH /api/surveys/{id}/questions/{id}/move-up
|   |  C5d: PATCH /api/surveys/{id}/questions/{id}/move-down
|
+-- C6: Survey Builder UI
|   |  C6a: surveyApi.js — axios service for all survey endpoints
|   |  C6b: surveyStore.js — migrate from fetch to axios
|   |  C6c: SurveyBuilderPage — three-zone layout (outline, canvas, settings)
|   |  C6d: SurveyBuilderHeader — title/description editor + add question button
|   |  C6e: QuestionCard — question text, type selector, required toggle, actions
|   |  C6f: QuestionTypeEditor — type-specific option inputs
|   |  C6g: QuestionActions — duplicate, delete, move up/down buttons
|   |  C6h: Save state indicator (Saving, Saved, Unsaved)
|
+-- C7: Preview Mode
|   |  C7a: SurveyPreviewPage — readonly respondent view
|   |  C7b: Progress indicator for surveys with >3 questions
|   |  C7c: Validation states (required fields highlighted)
|   |  C7d: Submit button and success state
|
+-- C8: Verification
|   |  C8a: Backend integration tests for all endpoints
|   |  C8b: Frontend smoke test — create survey with questions
|   |  C8c: Frontend smoke test — reorder questions
|   |  C8d: Frontend smoke test — preview mode
|   |  C8e: Playwright E2E tests for builder flow
```

## Detailed Implementation

### C1: Survey CRUD API

#### C1a: Survey Schemas and Slug Generation
**Files**: `backend/app/schemas.py`
- Add `SurveyCreateRequest` (title: str, description: Optional[str])
- Add `SurveyUpdateRequest` (title: Optional[str], description: Optional[str], status: Optional[str])
- Add `SurveyResponse` (id, creator_id, title, description, slug, status, created_at, updated_at, question_count)
- Slug generation: convert title to lowercase, replace spaces with hyphens, strip special chars
- **Commit**: `feat: add survey schemas and slug generation`

#### C1b: GET /api/surveys/my (List with Pagination)
**Files**: `backend/app/api/survey.py`
- Query surveys by creator_id (current user)
- Paginate: page size 20, page number query param
- Return survey summaries (no questions nested)
- **Commit**: `feat: add survey list endpoint`

#### C1c: POST /api/surveys (Create with Auto-Slug)
**Files**: `backend/app/api/survey.py`
- Accept SurveyCreateRequest
- Auto-generate slug from title
- Set status to 'active' by default
- Return created survey with full details
- **Commit**: `feat: add survey create endpoint`

#### C1d: GET /api/surveys/{id} (Full Survey with Nested Questions)
**Files**: `backend/app/api/survey.py`
- Return survey with all questions (ordered by position)
- Include question count in response
- **Commit**: `feat: add survey detail endpoint`

#### C1e: PUT /api/surveys/{id} (Update)
**Files**: `backend/app/api/survey.py`
- Update title, description, status
- Regenerate slug if title changes
- Return updated survey
- **Commit**: `feat: add survey update endpoint`

#### C1f: DELETE /api/surveys/{id} (Cascade Delete)
**Files**: `backend/app/api/survey.py`
- Delete survey and all associated questions, responses, answers
- Confirm cascade behavior is desired (currently configured)
- **Commit**: `feat: add survey delete endpoint`

---

### C2: Question Type Validation

#### C2a: Define Question Type Enum
**Files**: `backend/app/schemas.py`
- Define allowed question types: `multiple_choice`, `short_text`, `long_text`, `rating`
- Add `QuestionCreateRequest` (text: str, question_type: str, required: bool, options: Optional[list], min: Optional[int], max: Optional[int])
- Add `QuestionUpdateRequest` (partial updates)
- **Commit**: `feat: add question type enum and schemas`

#### C2b: Question Creation Schema
**Files**: `backend/app/schemas.py`
- Validate question_type against allowed values
- Validate text length (1-500 chars)
- Validate required flag (boolean)
- **Commit**: `feat: add question creation validation`

#### C2c: Type-Specific Validation
**Files**: `backend/app/api/survey.py`
- Multiple choice: validate options is a list, each option is a non-empty string, max 10 options, unique options
- Rating: validate min (1-5), max (1-5), min <= max
- Short text: max 500 characters
- Long text: max 2000 characters
- **Commit**: `feat: add type-specific question validation`

---

### C3: Multiple Choice and Rating Endpoints

#### C3a: POST /api/surveys/{id}/questions (General)
**Files**: `backend/app/api/survey.py`
- Accept QuestionCreateRequest
- Set default position based on existing question count
- Return created question
- **Commit**: `feat: add question creation endpoint`

#### C3b: Multiple Choice Validation
**Files**: `backend/app/api/survey.py`
- When question_type == 'multiple_choice':
  - Validate options field is present and is a list
  - Each option must be a non-empty string
  - Max 10 options
  - All options must be unique
- **Commit**: `feat: add multiple choice validation`

#### C3c: Rating Validation
**Files**: `backend/app/api/survey.py`
- When question_type == 'rating':
  - Validate min is integer between 1-5
  - Validate max is integer between 1-5
  - Validate min <= max
- **Commit**: `feat: add rating validation`

---

### C4: Text Question Endpoints

#### C4a: Short Text Question
**Files**: `backend/app/api/survey.py`
- When question_type == 'short_text':
  - Validate text is present and 1-500 characters
  - No additional fields required
- **Commit**: `feat: add short text question support`

#### C4b: Long Text Question
**Files**: `backend/app/api/survey.py`
- When question_type == 'long_text':
  - Validate text is present and 1-2000 characters
  - No additional fields required
- **Commit**: `feat: add long text question support`

---

### C5: Question Ordering

#### C5a: GET /api/surveys/{id}/questions (Ordered)
**Files**: `backend/app/api/survey.py`
- Return questions ordered by position field
- Include question details (text, type, required, options)
- **Commit**: `feat: add ordered question list endpoint`

#### C5b: PATCH /api/surveys/{id}/questions/reorder (Bulk Reorder)
**Files**: `backend/app/api/survey.py`
- Accept list of question IDs in desired order
- Update position field for each question
- Validate all IDs belong to the same survey
- **Commit**: `feat: add bulk reorder endpoint`

#### C5c: PATCH /api/surveys/{id}/questions/{question_id}/move-up
**Files**: `backend/app/api/survey.py`
- Find question and the one above it
- Swap positions
- Return updated question
- **Commit**: `feat: add move up endpoint`

#### C5d: PATCH /api/surveys/{id}/questions/{question_id}/move-down
**Files**: `backend/app/api/survey.py`
- Find question and the one below it
- Swap positions
- Return updated question
- **Commit**: `feat: add move down endpoint`

---

### C6: Survey Builder UI

#### C6a: surveyApi.js — Axios Service
**Files**: `frontend/src/services/surveyApi.js`
- Create axios instance with baseURL 'http://localhost:6030'
- Request interceptor: attach Authorization header from localStorage
- Response interceptor: handle 401 (clear auth, redirect to /login)
- Methods:
  - createSurvey(data) — POST /api/surveys
  - getMySurveys() — GET /api/surveys/my
  - getSurvey(id) — GET /api/surveys/{id}
  - updateSurvey(id, data) — PUT /api/surveys/{id}
  - deleteSurvey(id) — DELETE /api/surveys/{id}
  - addQuestion(surveyId, questionData) — POST /api/surveys/{id}/questions
  - reorderQuestions(surveyId, questionIds) — PATCH /api/surveys/{id}/questions/reorder
  - moveQuestionUp(surveyId, questionId) — PATCH /api/surveys/{id}/questions/{id}/move-up
  - moveQuestionDown(surveyId, questionId) — PATCH /api/surveys/{id}/questions/{id}/move-down
- **Commit**: `feat: add survey API service`

#### C6b: surveyStore.js — Migrate to Axios
**Files**: `frontend/src/store/surveyStore.js`
- Replace fetch calls with surveyApi methods
- Add actions:
  - fetchMySurveys() — calls getMySurveys()
  - fetchSurvey(id) — calls getSurvey(id)
  - createSurvey(data) — calls createSurvey()
  - updateSurvey(id, data) — calls updateSurvey()
  - deleteSurvey(id) — calls deleteSurvey()
  - addQuestion(surveyId, questionData) — calls addQuestion()
  - reorderQuestions(surveyId, questionIds) — calls reorderQuestions()
  - moveQuestionUp(surveyId, questionId) — calls moveQuestionUp()
  - moveQuestionDown(surveyId, questionId) — calls moveQuestionDown()
- Keep setCurrentSurvey action
- **Commit**: `feat: migrate surveyStore to axios`

#### C6c: SurveyBuilderPage — Three-Zone Layout
**Files**: `frontend/src/pages/SurveyBuilderPage.jsx`
- Layout: left sidebar (question outline), center (canvas), right (settings)
- Load survey data on mount
- Header: survey title input, description textarea, save state indicator
- Left sidebar: ordered list of question cards with drag handle
- Center: editable question cards
- Right: selected question settings panel (type, required, options)
- "Add question" button with type dropdown
- **Commit**: `feat: add survey builder page layout`

#### C6d: SurveyBuilderHeader
**Files**: `frontend/src/components/SurveyBuilderHeader.jsx`
- Title input (bound to survey.title)
- Description textarea (bound to survey.description)
- Save state indicator: "Saving..." → "Saved" → "Unsaved changes"
- Auto-save debounce (2s after last edit)
- **Commit**: `feat: add survey builder header`

#### C6e: QuestionCard
**Files**: `frontend/src/components/QuestionCard.jsx`
- Question number (based on position)
- Question text input (bound to question.text)
- Question type selector dropdown (multiple_choice, short_text, long_text, rating)
- Required toggle switch
- Drag handle icon (visual only, reordering via buttons)
- Duplicate and delete icon buttons
- Selected state (primary-soft background when selected)
- **Commit**: `feat: add question card component`

#### C6f: QuestionTypeEditor
**Files**: `frontend/src/components/QuestionTypeEditor.jsx`
- Multiple choice: text input for each option, "Add option" button, max 10
- Rating: min/max range inputs (1-5)
- Displayed when question type is selected in QuestionCard
- **Commit**: `feat: add question type editor`

#### C6g: QuestionActions
**Files**: `frontend/src/components/QuestionActions.jsx`
- Move up button (disabled if first question)
- Move down button (disabled if last question)
- Duplicate button (creates copy with new text, incremented position)
- Delete button (with confirmation dialog)
- **Commit**: `feat: add question action buttons`

#### C6h: Save State Indicator
**Files**: `frontend/src/components/SaveStateIndicator.jsx`
- States: "Saved" (green), "Saving..." (blue pulsing), "Unsaved changes" (yellow)
- Auto-update based on debounce timer
- **Commit**: `feat: add save state indicator`

---

### C7: Preview Mode

#### C7a: SurveyPreviewPage — Readonly View
**Files**: `frontend/src/pages/SurveyPreviewPage.jsx`
- Load survey by ID from URL params
- Display survey title and description
- Show questions in order (read-only)
- No edit controls, no type selector, no reorder buttons
- Question inputs disabled or styled as readonly
- **Commit**: `feat: add survey preview page`

#### C7b: Progress Indicator
**Files**: `frontend/src/pages/SurveyPreviewPage.jsx`
- Show progress bar when survey has >3 questions
- Display current question number and total
- **Commit**: `feat: add preview progress indicator`

#### C7c: Validation States
**Files**: `frontend/src/pages/SurveyPreviewPage.jsx`
- Highlight required fields that are empty
- Show validation error messages
- **Commit**: `feat: add preview validation states`

#### C7d: Submit Button and Success State
**Files**: `frontend/src/pages/SurveyPreviewPage.jsx`
- Submit button at bottom of form
- Success message after submission (no actual submission in Phase 3)
- **Commit**: `feat: add preview submit and success`

---

### C8: Verification

#### C8a: Backend Integration Tests
**Files**: `backend/tests/test_survey.py`
- Test survey CRUD (create, read, update, delete)
- Test question CRUD with type validation
- Test question reordering
- Test cascade delete
- Test error cases (duplicate slug, invalid types, etc.)
- **Commit**: `test: add survey CRUD tests`

#### C8b: Frontend Smoke Test — Create Survey
**Files**: `frontend/tests/smoke.spec.js`
- Login as user
- Navigate to /builder
- Create new survey with title and description
- Add multiple questions of different types
- **Commit**: `test: add builder smoke test`

#### C8c: Frontend Smoke Test — Reorder Questions
**Files**: `frontend/tests/smoke.spec.js`
- Navigate to /builder with existing survey
- Move questions up and down
- Verify order persists
- **Commit**: `test: add reorder smoke test`

#### C8d: Frontend Smoke Test — Preview Mode
**Files**: `frontend/tests/smoke.spec.js`
- Navigate to /builder
- Click preview button
- Verify readonly view
- Verify progress indicator
- **Commit**: `test: add preview smoke test`

#### C8e: Playwright E2E Tests
**Files**: `frontend/tests/builder.spec.js` (new)
- Full E2E flow: create survey → add questions → reorder → preview
- Verify all question types render correctly
- Verify validation messages
- Verify save state transitions
- **Commit**: `test: add Playwright E2E tests for builder`

---

## Dependencies
- Phase 1-1: Backend Foundation (models, database, Alembic)
- Phase 1-2: Frontend Foundation (React, Tailwind, Zustand, Layout)
- Phase 2-1/2-2: Authentication (auth endpoints, JWT, frontend auth store)
- Design system: docs/plans/DESIGN.md
- Existing models: Survey, Question, Response, Answer (all defined)
- Existing auth: JWT tokens, protected routes working

## Risks and Notes
1. **surveyStore.js fetch migration**: Current surveyStore uses raw fetch with hardcoded URL. Must migrate to axios for consistency and 401 interceptor.
2. **Slug generation**: Need to implement slugify logic (lowercase, replace spaces with hyphens, strip special chars).
3. **CASCADE deletes**: Current config cascades deletes from Survey to questions/responses/answers. Must confirm this is desired behavior.
4. **Builder UI complexity**: Three-zone layout is complex. Start with basic question cards, add type-specific editors incrementally.
5. **Preview mode**: Must work without authentication (public respondent view).
6. **Question position**: Auto-increment on creation, manual reorder via API.
7. **Auto-save**: Implement debounce-based auto-save in builder header.

## Implementation Order
```
C1a -> C1b -> C1c -> C1d -> C1e -> C1f
C2a -> C2b -> C2c
C3a -> C3b -> C3c
C4a -> C4b
C5a -> C5b -> C5c -> C5d
C6a -> C6b -> C6c -> C6d -> C6e -> C6f -> C6g -> C6h
C7a -> C7b -> C7c -> C7d
C8a -> C8b -> C8c -> C8d -> C8e
```
