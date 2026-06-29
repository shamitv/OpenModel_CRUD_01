# Phase 3: Survey Builder — To-Do

## C1: Survey CRUD API

### C1a: Survey Schemas and Slug Generation
- [ ] Add SurveyCreateRequest schema (title, description)
- [ ] Add SurveyUpdateRequest schema (title, description, status)
- [ ] Add SurveyResponse schema (full survey details)
- [ ] Implement slug generation from title (lowercase, hyphens, strip special chars)
- [ ] **Commit**: `feat: add survey schemas and slug generation`

### C1b: GET /api/surveys/my (List with Pagination)
- [ ] Create GET /api/surveys/my endpoint
- [ ] Query surveys by creator_id with pagination (page, page_size)
- [ ] Return survey summaries (no nested questions)
- [ ] **Commit**: `feat: add survey list endpoint`

### C1c: POST /api/surveys (Create with Auto-Slug)
- [ ] Create POST /api/surveys endpoint
- [ ] Auto-generate slug from title
- [ ] Set default status to 'active'
- [ ] Return created survey with full details
- [ ] **Commit**: `feat: add survey create endpoint`

### C1d: GET /api/surveys/{id} (Full Survey with Nested Questions)
- [ ] Create GET /api/surveys/{id} endpoint
- [ ] Return survey with all questions ordered by position
- [ ] Include question count in response
- [ ] **Commit**: `feat: add survey detail endpoint`

### C1e: PUT /api/surveys/{id} (Update)
- [ ] Create PUT /api/surveys/{id} endpoint
- [ ] Update title, description, status
- [ ] Regenerate slug if title changes
- [ ] Return updated survey
- [ ] **Commit**: `feat: add survey update endpoint`

### C1f: DELETE /api/surveys/{id} (Cascade Delete)
- [ ] Create DELETE /api/surveys/{id} endpoint
- [ ] Delete survey and all associated questions, responses, answers
- [ ] Confirm cascade behavior is desired
- [ ] **Commit**: `feat: add survey delete endpoint`

---

## C2: Question Type Validation

### C2a: Define Question Type Enum
- [ ] Define allowed question types: multiple_choice, short_text, long_text, rating
- [ ] Add QuestionCreateRequest schema (text, question_type, required, options, min, max)
- [ ] Add QuestionUpdateRequest schema (partial updates)
- [ ] **Commit**: `feat: add question type enum and schemas`

### C2b: Question Creation Schema
- [ ] Validate question_type against allowed values
- [ ] Validate text length (1-500 chars)
- [ ] Validate required flag (boolean)
- [ ] **Commit**: `feat: add question creation validation`

### C2c: Type-Specific Validation
- [ ] Multiple choice: validate options is list, non-empty strings, max 10, unique
- [ ] Rating: validate min (1-5), max (1-5), min <= max
- [ ] Short text: max 500 characters
- [ ] Long text: max 2000 characters
- [ ] **Commit**: `feat: add type-specific question validation`

---

## C3: Multiple Choice and Rating Endpoints

### C3a: POST /api/surveys/{id}/questions (General)
- [ ] Create POST /api/surveys/{id}/questions endpoint
- [ ] Set default position based on existing question count
- [ ] Return created question
- [ ] **Commit**: `feat: add question creation endpoint`

### C3b: Multiple Choice Validation
- [ ] When question_type == 'multiple_choice':
  - [ ] Validate options field is present and is a list
  - [ ] Each option must be a non-empty string
  - [ ] Max 10 options
  - [ ] All options must be unique
- [ ] **Commit**: `feat: add multiple choice validation`

### C3c: Rating Validation
- [ ] When question_type == 'rating':
  - [ ] Validate min is integer between 1-5
  - [ ] Validate max is integer between 1-5
  - [ ] Validate min <= max
- [ ] **Commit**: `feat: add rating validation`

---

## C4: Text Question Endpoints

### C4a: Short Text Question
- [ ] When question_type == 'short_text':
  - [ ] Validate text is present and 1-500 characters
  - [ ] No additional fields required
- [ ] **Commit**: `feat: add short text question support`

### C4b: Long Text Question
- [ ] When question_type == 'long_text':
  - [ ] Validate text is present and 1-2000 characters
  - [ ] No additional fields required
- [ ] **Commit**: `feat: add long text question support`

---

## C5: Question Ordering

### C5a: GET /api/surveys/{id}/questions (Ordered)
- [ ] Create GET /api/surveys/{id}/questions endpoint
- [ ] Return questions ordered by position field
- [ ] Include question details (text, type, required, options)
- [ ] **Commit**: `feat: add ordered question list endpoint`

### C5b: PATCH /api/surveys/{id}/questions/reorder (Bulk Reorder)
- [ ] Create PATCH /api/surveys/{id}/questions/reorder endpoint
- [ ] Accept list of question IDs in desired order
- [ ] Update position field for each question
- [ ] Validate all IDs belong to the same survey
- [ ] **Commit**: `feat: add bulk reorder endpoint`

### C5c: PATCH /api/surveys/{id}/questions/{question_id}/move-up
- [ ] Create PATCH /api/surveys/{id}/questions/{question_id}/move-up endpoint
- [ ] Find question and the one above it
- [ ] Swap positions
- [ ] Return updated question
- [ ] **Commit**: `feat: add move up endpoint`

### C5d: PATCH /api/surveys/{id}/questions/{question_id}/move-down
- [ ] Create PATCH /api/surveys/{id}/questions/{question_id}/move-down endpoint
- [ ] Find question and the one below it
- [ ] Swap positions
- [ ] Return updated question
- [ ] **Commit**: `feat: add move down endpoint`

---

## C6: Survey Builder UI

### C6a: surveyApi.js — Axios Service
- [ ] Create axios instance with baseURL 'http://localhost:6030'
- [ ] Request interceptor: attach Authorization header from localStorage
- [ ] Response interceptor: handle 401 (clear auth, redirect to /login)
- [ ] Add all survey API methods (create, get, update, delete, add question, reorder, move up/down)
- [ ] **Commit**: `feat: add survey API service`

### C6b: surveyStore.js — Migrate to Axios
- [ ] Replace fetch calls with surveyApi methods
- [ ] Add all survey store actions (fetchMySurveys, fetchSurvey, create, update, delete, addQuestion, reorder, moveUp, moveDown)
- [ ] Keep setCurrentSurvey action
- [ ] **Commit**: `feat: migrate surveyStore to axios`

### C6c: SurveyBuilderPage — Three-Zone Layout
- [ ] Create SurveyBuilderPage component
- [ ] Implement left sidebar (question outline list)
- [ ] Implement center canvas (editable question cards)
- [ ] Implement right settings panel (selected question settings)
- [ ] Add "Add question" button with type dropdown
- [ ] **Commit**: `feat: add survey builder page layout`

### C6d: SurveyBuilderHeader
- [ ] Create SurveyBuilderHeader component
- [ ] Title input (bound to survey.title)
- [ ] Description textarea (bound to survey.description)
- [ ] Save state indicator ("Saving..." → "Saved" → "Unsaved changes")
- [ ] Auto-save debounce (2s after last edit)
- [ ] **Commit**: `feat: add survey builder header`

### C6e: QuestionCard
- [ ] Create QuestionCard component
- [ ] Question number (based on position)
- [ ] Question text input (bound to question.text)
- [ ] Question type selector dropdown
- [ ] Required toggle switch
- [ ] Drag handle icon (visual only)
- [ ] Duplicate and delete icon buttons
- [ ] Selected state (primary-soft background)
- [ ] **Commit**: `feat: add question card component`

### C6f: QuestionTypeEditor
- [ ] Create QuestionTypeEditor component
- [ ] Multiple choice: text inputs for options, "Add option" button, max 10
- [ ] Rating: min/max range inputs (1-5)
- [ ] Displayed when question type is selected
- [ ] **Commit**: `feat: add question type editor`

### C6g: QuestionActions
- [ ] Create QuestionActions component
- [ ] Move up button (disabled if first question)
- [ ] Move down button (disabled if last question)
- [ ] Duplicate button (creates copy with new text, incremented position)
- [ ] Delete button (with confirmation dialog)
- [ ] **Commit**: `feat: add question action buttons`

### C6h: Save State Indicator
- [ ] Create SaveStateIndicator component
- [ ] States: "Saved" (green), "Saving..." (blue pulsing), "Unsaved changes" (yellow)
- [ ] Auto-update based on debounce timer
- [ ] **Commit**: `feat: add save state indicator`

---

## C7: Preview Mode

### C7a: SurveyPreviewPage — Readonly View
- [ ] Create SurveyPreviewPage component
- [ ] Load survey by ID from URL params
- [ ] Display survey title and description
- [ ] Show questions in order (read-only)
- [ ] No edit controls, no type selector, no reorder buttons
- [ ] **Commit**: `feat: add survey preview page`

### C7b: Progress Indicator
- [ ] Show progress bar when survey has >3 questions
- [ ] Display current question number and total
- [ ] **Commit**: `feat: add preview progress indicator`

### C7c: Validation States
- [ ] Highlight required fields that are empty
- [ ] Show validation error messages
- [ ] **Commit**: `feat: add preview validation states`

### C7d: Submit Button and Success State
- [ ] Add submit button at bottom of form
- [ ] Show success message after submission (no actual submission in Phase 3)
- [ ] **Commit**: `feat: add preview submit and success`

---

## C8: Verification

### C8a: Backend Integration Tests
- [ ] Create backend/tests/test_survey.py
- [ ] Test survey CRUD (create, read, update, delete)
- [ ] Test question CRUD with type validation
- [ ] Test question reordering
- [ ] Test cascade delete
- [ ] Test error cases (duplicate slug, invalid types, etc.)
- [ ] **Commit**: `test: add survey CRUD tests`

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
