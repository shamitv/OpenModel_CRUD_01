# Phase 3: Survey Builder — To-Do

## C1: Survey CRUD API

### C1a: Survey Schemas and Slug Generation
- [x] Add SurveyCreateRequest schema (title, description)
- [x] Add SurveyUpdateRequest schema (title, description, status)
- [x] Add SurveyResponse schema (full survey details)
- [x] Implement slug generation from title (lowercase, hyphens, strip special chars)
- [x] **Commit**: `feat: add survey schemas and slug generation`

### C1b: GET /api/surveys/my (List with Pagination)
- [x] Create GET /api/surveys/my endpoint
- [x] Query surveys by creator_id with pagination (page, page_size)
- [x] Return survey summaries (no nested questions)
- [x] **Commit**: `feat: add survey list endpoint`

### C1c: POST /api/surveys (Create with Auto-Slug)
- [x] Create POST /api/surveys endpoint
- [x] Auto-generate slug from title
- [x] Set default status to 'active'
- [x] Return created survey with full details
- [x] **Commit**: `feat: add survey create endpoint`

### C1d: GET /api/surveys/{id} (Full Survey with Nested Questions)
- [x] Create GET /api/surveys/{id} endpoint
- [x] Return survey with all questions ordered by position
- [x] Include question count in response
- [x] **Commit**: `feat: add survey detail endpoint`

### C1e: PUT /api/surveys/{id} (Update)
- [x] Create PUT /api/surveys/{id} endpoint
- [x] Update title, description, status
- [x] Regenerate slug if title changes
- [x] Return updated survey
- [x] **Commit**: `feat: add survey update endpoint`

### C1f: DELETE /api/surveys/{id} (Cascade Delete)
- [x] Create DELETE /api/surveys/{id} endpoint
- [x] Delete survey and all associated questions, responses, answers
- [x] Confirm cascade behavior is desired
- [x] **Commit**: `feat: add survey delete endpoint`

---

## C2: Question Type Validation

### C2a: Define Question Type Enum
- [x] Define allowed question types: multiple_choice, short_text, long_text, rating
- [x] Add QuestionCreateRequest schema (text, question_type, required, options, min, max)
- [x] Add QuestionUpdateRequest schema (partial updates)
- [x] **Commit**: `feat: add question type enum and schemas`

### C2b: Question Creation Schema
- [x] Validate question_type against allowed values
- [x] Validate text length (1-500 chars)
- [x] Validate required flag (boolean)
- [x] **Commit**: `feat: add question creation validation`

### C2c: Type-Specific Validation
- [x] Multiple choice: validate options is list, non-empty strings, max 10, unique
- [x] Rating: validate min (1-5), max (1-5), min <= max
- [x] Short text: max 500 characters
- [x] Long text: max 2000 characters
- [x] **Commit**: `feat: add type-specific question validation`

---

## C3: Multiple Choice and Rating Endpoints

### C3a: POST /api/surveys/{id}/questions (General)
- [x] Create POST /api/surveys/{id}/questions endpoint
- [x] Set default position based on existing question count
- [x] Return created question
- [x] **Commit**: `feat: add question creation endpoint`

### C3b: Multiple Choice Validation
- [x] When question_type == 'multiple_choice':
  - [x] Validate options field is present and is a list
  - [x] Each option must be a non-empty string
  - [x] Max 10 options
  - [x] All options must be unique
- [x] **Commit**: `feat: add multiple choice validation`

### C3c: Rating Validation
- [x] When question_type == 'rating':
  - [x] Validate min is integer between 1-5
  - [x] Validate max is integer between 1-5
  - [x] Validate min <= max
- [x] **Commit**: `feat: add rating validation`

---

## C4: Text Question Endpoints

### C4a: Short Text Question
- [x] When question_type == 'short_text':
  - [x] Validate text is present and 1-500 characters
  - [x] No additional fields required
- [x] **Commit**: `feat: add short text question support`

### C4b: Long Text Question
- [x] When question_type == 'long_text':
  - [x] Validate text is present and 1-2000 characters
  - [x] No additional fields required
- [x] **Commit**: `feat: add long text question support`

---

## C5: Question Ordering

### C5a: GET /api/surveys/{id}/questions (Ordered)
- [x] Create GET /api/surveys/{id}/questions endpoint
- [x] Return questions ordered by position field
- [x] Include question details (text, type, required, options)
- [x] **Commit**: `feat: add ordered question list endpoint`

### C5b: PATCH /api/surveys/{id}/questions/reorder (Bulk Reorder)
- [x] Create PATCH /api/surveys/{id}/questions/reorder endpoint
- [x] Accept list of question IDs in desired order
- [x] Update position field for each question
- [x] Validate all IDs belong to the same survey
- [x] **Commit**: `feat: add bulk reorder endpoint`

### C5c: PATCH /api/surveys/{id}/questions/{question_id}/move-up
- [x] Create PATCH /api/surveys/{id}/questions/{question_id}/move-up endpoint
- [x] Find question and the one above it
- [x] Swap positions (raw SQL update for atomicity)
- [x] Return updated question
- [x] **Commit**: `feat: add move up endpoint`

### C5d: PATCH /api/surveys/{id}/questions/{question_id}/move-down
- [x] Create PATCH /api/surveys/{id}/questions/{question_id}/move-down endpoint
- [x] Find question and the one below it
- [x] Swap positions (raw SQL update for atomicity)
- [x] Return updated question
- [x] **Commit**: `feat: add move down endpoint`

---

## C6: Survey Builder UI

### C6a: surveyApi.js — Axios Service
- [x] Create axios instance with baseURL 'http://localhost:6030'
- [x] Request interceptor: attach Authorization header from localStorage
- [x] Response interceptor: handle 401 (clear auth, redirect to /login)
- [x] Add all survey API methods (create, get, update, delete, add question, reorder, move up/down)
- [x] **Commit**: `feat: add survey API service`

### C6b: surveyStore.js — Migrate to Axios
- [x] Replace fetch calls with surveyApi methods
- [x] Add all survey store actions (fetchMySurveys, fetchSurvey, create, update, delete, addQuestion, reorder, moveUp, moveDown)
- [x] Keep setCurrentSurvey action
- [x] **Commit**: `feat: migrate surveyStore to axios`
- [x] **Bug fix**: `deleteQuestion` API URL corrected — now passes both `surveyId` and `questionId` to match backend endpoint `DELETE /api/surveys/{survey_id}/questions/{question_id}`
- [x] **Commits**: `fix: resolve phase 3 known issues` (`2087a50`), `fix: correct deleteQuestion API URL` (`ccf00a8`)

### C6c: SurveyBuilderPage — Three-Zone Layout
- [x] Create SurveyBuilderPage component
- [x] Implement left sidebar (question outline list)
- [x] Implement center canvas (editable question cards)
- [x] Implement right settings panel (selected question settings)
- [x] Add "Add question" button with type dropdown
- [x] **Commit**: `feat: add survey builder page layout`

### C6d: SurveyBuilderHeader
- [x] Create SurveyBuilderHeader component
- [x] Title input (bound to survey.title)
- [x] Description textarea (bound to survey.description)
- [x] Save state indicator ("Saving..." → "Saved" → "Unsaved changes")
- [x] Auto-save debounce (2s after last edit)
- [x] **Commit**: `feat: add survey builder header`

### C6e: QuestionCard
- [x] Create QuestionCard component
- [x] Question number (based on position)
- [x] Question text input (bound to question.text)
- [x] Question type selector dropdown
- [x] Required toggle switch
- [x] Drag handle icon (visual only)
- [x] Duplicate and delete icon buttons
- [x] Selected state (primary-soft background)
- [x] **Commit**: `feat: add question card component`

### C6f: QuestionTypeEditor
- [x] Create QuestionTypeEditor component
- [x] Multiple choice: text inputs for options, "Add option" button, max 10
- [x] Rating: min/max range inputs (1-5)
- [x] Displayed when question type is selected
- [x] **Commit**: `feat: add question type editor`

### C6g: QuestionActions
- [x] Create QuestionActions component
- [x] Move up button (disabled if first question)
- [x] Move down button (disabled if last question)
- [x] Duplicate button (creates copy with new text, incremented position)
- [x] Delete button (with confirmation dialog)
- [x] **Commit**: `feat: add question action buttons`

### C6h: Save State Indicator
- [x] Create SaveStateIndicator component
- [x] States: "Saved" (green), "Saving..." (blue pulsing), "Unsaved changes" (yellow)
- [x] Auto-update based on debounce timer
- [x] **Commit**: `feat: add save state indicator`

---

## C7: Preview Mode

### C7a: SurveyPreviewPage — Readonly View
- [x] Create SurveyPreviewPage component
- [x] Load survey by ID from URL params
- [x] Display survey title and description
- [x] Show questions in order (read-only)
- [x] No edit controls, no type selector, no reorder buttons
- [x] **Commit**: `feat: add survey preview page`

### C7b: Progress Indicator
- [x] Show progress bar when survey has >3 questions
- [x] Display current question number and total
- [x] **Commit**: `feat: add preview progress indicator`

### C7c: Validation States
- [x] Highlight required fields that are empty
- [x] Show validation error messages
- [x] **Commit**: `feat: add preview validation states`

### C7d: Submit Button and Success State
- [x] Add submit button at bottom of form
- [x] Show success message after submission (no actual submission in Phase 3)
- [x] **Commit**: `feat: add preview submit and success`

---

## C8: Verification

### C8a: Backend Integration Tests
- [x] Create backend/tests/test_survey.py
- [x] Test survey CRUD (create, read, update, delete)
- [x] Test question CRUD with type validation
- [x] Test question reordering
- [x] Test cascade delete
- [x] Test error cases (duplicate slug, invalid types, etc.)
- [x] **Commit**: `test: add survey CRUD tests`
- [x] **Result**: 45 passing, 0 failing

### C8b: Frontend Smoke Test — Create Survey
- [ ] Update frontend/tests/smoke.spec.js
- [ ] Login as user
- [ ] Navigate to /builder
- [ ] Create new survey with title and description
- [ ] Add multiple questions of different types
- [ ] **Commit**: `test: add builder smoke test`

### C8c: Frontend Smoke Test — Reorder Questions
- [ ] Update frontend/tests/smoke.spec.js
- [ ] Navigate to /builder with existing survey
- [ ] Move questions up and down
- [ ] Verify order persists
- [ ] **Commit**: `test: add reorder smoke test`

### C8d: Frontend Smoke Test — Preview Mode
- [ ] Update frontend/tests/smoke.spec.js
- [ ] Navigate to /builder
- [ ] Click preview button
- [ ] Verify readonly view
- [ ] Verify progress indicator
- [ ] **Commit**: `test: add preview smoke test`

### C8e: Playwright E2E Tests
- [ ] Create frontend/tests/builder.spec.js
- [ ] Full E2E flow: create survey → add questions → reorder → preview
- [ ] Verify all question types render correctly
- [ ] Verify validation messages
- [ ] Verify save state transitions
- [ ] **Commit**: `test: add Playwright E2E tests for builder`

---

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

## Summary
- **Completed**: C1–C7, C8a (all backend)
- **Remaining**: C8b, C8c, C8d, C8e (frontend smoke + E2E tests)
- **Backend tests**: 45/45 passing (14 auth + 31 survey)
- **Bug fixes**: `test_move_question_down` assertion fixed (`2087a50`), `deleteQuestion` API URL corrected (`ccf00a8`)
