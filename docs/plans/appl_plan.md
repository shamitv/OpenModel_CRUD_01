# Project Plan: Survey Creation Application

## Overview
A web application that enables users to design, distribute, and analyze surveys.

This plan includes repository setup, implementation stages, commit checkpoints after each stage, and Playwright test tasks added for each feature.

Local development runtime requirement:
- Reserve backend port `6030` for all local API runs, frontend API configuration, and test configuration.
- Do not use port `8000` anywhere in local development or automated test flows for this project.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Zustand
- **Backend**: Python (FastAPI), SQLAlchemy
- **Database**: SQLite (initial versions), PostgreSQL (production)
- **Authentication**: JWT-based authentication
- **E2E testing**: Playwright

**Freshness note**: Before installing dependencies or scaffolding new code, check the official documentation and package registries for the current stable, supported releases of the selected libraries. Avoid copying stale tutorial versions; prefer compatible LTS/stable releases, then record the chosen exact versions in the project dependency files.

## Design System Source
- Use `docs/plans/DESIGN.md` as the source of truth for the survey app's visual direction, layout patterns, component behavior, responsive rules, and accessibility requirements.
- Before implementing frontend work in each stage, map the relevant `DESIGN.md` tokens and screen requirements into the React/Tailwind components being built.
- Playwright checks for user-facing features should verify both behavior and the critical UI states called out in `DESIGN.md`, including loading, empty, error, validation, success, and responsive states where relevant.

## Project Setup
This plan assumes the system toolchain is already installed. Do not add OS package installation, runtime installation, browser OS dependency installation, or firewall setup commands here; missing required tools are blockers to resolve outside this project plan.

### 0.1 Initialize Git In The Project Root And Commit The Plan Baseline
- [ ] Confirm the shell is in the project root:
  ```bash
  pwd
  ```
- [ ] Initialize the repo if it is not already a Git repository:
  ```bash
  git init
  git branch -M main
  ```
- [ ] Commit this plan as it is before making later phase or status updates:
  ```bash
  git add docs/plans/appl_plan.md
  git commit -m "docs: add initial application plan"
  ```

### 0.2 Required Toolchain Preflight
- [ ] Run this preflight before any dependency installation. If `python3`, `pip`, or `npm` is missing, stop the plan and provision the machine outside this project plan before continuing:
  ```bash
  command -v python3 >/dev/null || { echo "ERROR: python3 is required before following this plan."; exit 1; }
  python3 -m pip --version >/dev/null || { echo "ERROR: pip for python3 is required before following this plan."; exit 1; }
  command -v npm >/dev/null || { echo "ERROR: npm is required before following this plan."; exit 1; }
  ```
- [ ] Add a `.gitignore` before committing generated or environment-specific files if one is missing. At minimum, ignore local virtualenvs, Python caches, Node dependencies, browser reports, local databases, and local env files:
  ```text
  backend/venv/
  __pycache__/
  *.pyc
  frontend/node_modules/
  frontend/playwright-report/
  frontend/test-results/
  backend/*.db
  backend/.env
  logs/
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

### 0.3 Python Environment Setup
- [ ] Create and activate the backend virtual environment:
  ```bash
  cd backend
  python3 -m venv venv
  source venv/bin/activate
  python -m pip install --upgrade pip
  ```
- [ ] Install backend dependencies:
  ```bash
  cd backend
  source venv/bin/activate
  python -m pip install -r requirements.txt
  ```
- [ ] Configure local backend environment values in `backend/.env`:
  ```bash
  cd backend
  printf '%s\n' \
    'SECRET_KEY=replace-with-a-local-secret' \
    'SQLALCHEMY_DATABASE_URI=sqlite:///./survey_app.db' \
    'BACKEND_PORT=6030' \
    > .env
  ```
- [ ] Apply database migrations:
  ```bash
  cd backend
  source venv/bin/activate
  alembic upgrade head
  ```
- [ ] Verify the API can start:
  ```bash
  cd backend
  source venv/bin/activate
  uvicorn app.main:app --reload --port 6030
  ```

### 0.4 Frontend Dependency Setup
- [ ] Install frontend dependencies:
  ```bash
  cd frontend
  npm install
  ```

### 0.5 Playwright Setup
- [ ] Confirm `@playwright/test` is present in `frontend/package.json`.
- [ ] Install Playwright browsers:
  ```bash
  cd frontend
  npx playwright install
  ```
- [ ] Run the existing E2E suite after the backend API is running:
  ```bash
  cd backend
  source venv/bin/activate
  uvicorn app.main:app --reload --port 6030
  ```
  ```bash
  cd frontend
  npx playwright test
  ```
- [ ] Definition of done for Playwright setup: capture a Playwright output snippet proving the suite can run, for example:
  ```text
  Running 2 tests using 1 worker
  2 passed
  ```

## Core Features

### 1. User Authentication For Admins And Creators
- User registration and login are required for survey creators and admins.
- System must store usernames or emails and salted/hashed passwords.
- Profile management.

### 2. Survey Builder
- Create new surveys with titles and descriptions.
- Add different question types:
  - Multiple choice
  - Short text
  - Long text
  - Rating scale
- Reorder questions.
- Preview survey.

### 3. Survey Management
- Dashboard to list all created surveys.
- Edit existing surveys.
- Delete surveys.
- View status of each survey: active or closed.

### 4. Survey Distribution
- Unique, shareable URL for each survey.
- Public interface for respondents, with no authentication required for answering surveys.

### 5. Response Collection And Analytics
- Store and manage survey responses.
- Real-time response counting via WebSockets or polling.
- Dashboard for survey creators to view results with charts or graphs.

### 6. Security And Validation
- Input validation using Pydantic.
- Rate limiting and protection for shareable URLs to reduce automated scraping.

### 7. Demo Survey Seeding And Bulk Test Responses
- Provide an admin UI option to create test surveys from `docs/plans/survey_studio_demo_surveys.md`.
- Provide an admin UI option to generate `500` to `800` synthetic responses for each seeded survey.
- Generate sample answers for the seeded demo surveys so each survey ends up with `500` to `800` stored responses.
- Keep generated answers aligned with each question's type and allowed options so analytics remain meaningful.
- Make the admin UI seed and bulk-response flow deterministic enough for local verification and automated non-production test environments.

## Data Model Direction

Treat the data model as a starting point for implementation, not as a final schema. Choose exact columns, ID strategy, indexes, constraints, and serialization shapes during backend design, based on the behavior needed by each stage.

Core concepts to support:
- **Users**: creators or admins who can authenticate and manage their own surveys.
- **Surveys**: creator-owned forms with title, description, lifecycle state, and shareable public access.
- **Questions**: ordered survey prompts with support for multiple question types and type-specific configuration.
- **Responses**: respondent submissions tied to a survey, including submission timing and any metadata needed for validation, analytics, or abuse prevention.
- **Answers**: per-question submitted values that can be validated and aggregated according to the question type.

Modeling guidance:
- Preserve clear ownership and relationship boundaries between users, surveys, questions, responses, and answers.
- Prefer constraints and indexes that protect data integrity and support the dashboard, public submission flow, and analytics queries.
- Keep question and answer storage flexible enough for multiple choice, text, rating, and future question types without overfitting to the first implementation.
- Document important schema decisions in the relevant migration or implementation summary when they are made.

## Staged Implementation Roadmap

At the end of every stage, pause and ask the project owner to commit that stage before moving on. Only stage files that belong to the completed stage.

### Stage 0: Repo Bootstrap And Dependency Setup
- [ ] Initialize Git in the project root.
- [ ] Commit `docs/plans/appl_plan.md` as the baseline plan before making later phase or status updates.
- [ ] Run the required toolchain preflight above; stop if `python3`, `pip`, or `npm` is missing.
- [ ] Install backend dependencies and run migrations.
- [ ] Install frontend dependencies.
- [ ] Install Playwright browsers.
- [ ] Run the existing Playwright suite once.
- [ ] Record the Playwright setup done snippet:
  ```text
  Running <n> tests using <n> workers
  <n> passed
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

### Stage 1: Backend And Frontend Foundation
- [ ] Initialize or verify FastAPI app structure.
- [ ] Initialize or verify SQLAlchemy configuration.
- [ ] Initialize or verify Alembic migrations.
- [ ] Initialize or verify React/Vite app structure.
- [ ] Initialize or verify Tailwind CSS configuration.
- [ ] Set backend and client-side local configuration to use port `6030`, including frontend API base URLs and Playwright environment settings.
- [ ] Map the base colors, typography, spacing, radius, and app-shell tokens from `docs/plans/DESIGN.md` into the frontend styling setup.
- [ ] Build or verify the initial app shell follows the `DESIGN.md` layout direction for dashboard-first product UI.
- [ ] Add a lightweight smoke test page or route if needed.
  - [ ] Add an automated Playwright smoke test to confirm the app shell loads.
  - [ ] Ensuring all modules (backend & frontend) emit regular and consistent logs.
- [ ] Run:
  ```bash
  cd frontend
  npx playwright test tests/smoke.spec.js --project=chromium
  ```
- [ ] Definition of done: paste a Playwright snippet confirming the app shell loads, for example:
  ```text
  [chromium] › tests/smoke.spec.js › app shell › loads the app
  1 passed
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

### Stage 2: Authentication
- [ ] Implement or verify user registration API.
- [ ] Implement or verify user login API.
- [ ] Store passwords with salted password hashing.
- [ ] Issue and validate JWT access tokens.
- [ ] Implement or verify frontend registration and login forms.
- [ ] Style auth screens according to the authentication, form, button, validation, and accessibility requirements in `docs/plans/DESIGN.md`.
- [ ] Implement or verify auth state handling in Zustand.
- [ ] Add or update Playwright tests for:
  - Successful registration
  - Registration failure
  - Successful login
  - Login failure
  - Protected route behavior
- [ ] Run:
  ```bash
  cd frontend
  npx playwright test tests/auth.spec.js --project=chromium
  ```
- [ ] Definition of done: paste a Playwright snippet confirming authentication works, for example:
  ```text
  [chromium] › tests/auth.spec.js › Registration › should allow a user to register
  [chromium] › tests/auth.spec.js › Login › should allow a user to login
  2 passed
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

### Stage 3: Survey Builder
- [ ] Implement survey creation API.
- [ ] Implement question creation API.
- [ ] Support multiple choice, short text, long text, and rating questions.
- [ ] Implement question ordering.
- [ ] Build the React survey builder UI.
- [ ] Build survey preview mode.
- [ ] Follow the survey builder layout, question-card patterns, save-state indicator, preview behavior, and unsaved-changes guidance in `docs/plans/DESIGN.md`.
- [ ] Add or update Playwright tests for:
  - Creating a survey with title and description
  - Adding each supported question type
  - Reordering questions
  - Previewing the survey before publishing
- [ ] Run:
  ```bash
  cd frontend
  npx playwright test tests/survey-builder.spec.js --project=chromium
  ```
- [ ] Definition of done: paste a Playwright snippet confirming survey builder behavior, for example:
  ```text
  [chromium] › tests/survey-builder.spec.js › Survey builder › creates a survey with multiple question types
  [chromium] › tests/survey-builder.spec.js › Survey builder › reorders questions and previews the survey
  2 passed
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

### Stage 4: Survey Management And Distribution
- [ ] Implement dashboard API for listing surveys created by the signed-in user.
- [ ] Build dashboard UI to list created surveys.
- [ ] Implement edit survey flow.
- [ ] Implement delete survey flow.
- [ ] Implement active or closed survey status.
- [ ] Generate unique shareable survey URLs.
- [ ] Build public respondent survey view that does not require authentication.
- [ ] Follow the dashboard, survey row, status pill, share dialog, public survey response, closed survey, and invalid URL states specified in `docs/plans/DESIGN.md`.
- [ ] Add or update Playwright tests for:
  - Listing surveys in the dashboard
  - Editing a survey
  - Deleting a survey
  - Changing active or closed status
  - Opening a public share URL while logged out
- [ ] Run:
  ```bash
  cd frontend
  npx playwright test tests/survey-management.spec.js tests/survey-distribution.spec.js --project=chromium
  ```
- [ ] Definition of done: paste a Playwright snippet confirming management and distribution behavior, for example:
  ```text
  [chromium] › tests/survey-management.spec.js › Survey management › edits and closes a survey
  [chromium] › tests/survey-distribution.spec.js › Survey distribution › opens a public survey URL without login
  2 passed
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

### Stage 5: Response Collection
- [ ] Implement response submission API.
- [ ] Validate response payloads with Pydantic.
- [ ] Persist responses and answers.
- [ ] Build respondent UI for submitting answers.
- [ ] Show a success or confirmation state after submission.
- [ ] Implement respondent form validation, required labels, success state, and public-page accessibility requirements from `docs/plans/DESIGN.md`.
- [ ] Add an admin UI control for non-production seeding that can create test surveys from `docs/plans/survey_studio_demo_surveys.md`.
- [ ] Ensure seeded surveys preserve question order, required flags, question types, and multiple-choice option lists from the demo survey bank.
- [ ] Add or update Playwright tests for:
  - Submitting answers to a public survey
  - Validating required or malformed answers
  - Confirming the response is persisted and visible to the creator
- [ ] Run:
  ```bash
  cd frontend
  npx playwright test tests/responses.spec.js --project=chromium
  ```
- [ ] Definition of done: paste a Playwright snippet confirming response collection works, for example:
  ```text
  [chromium] › tests/responses.spec.js › Responses › submits answers to a public survey
  [chromium] › tests/responses.spec.js › Responses › shows validation for missing required answers
  2 passed
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

### Stage 6: Analytics, Results, And Realtime Counts
- [ ] Implement results and analytics API.
- [ ] Implement response counting with polling or WebSockets.
- [ ] Build creator dashboard analytics views.
- [ ] Use Chart.js for visualizations.
- [ ] Add an admin UI control for non-production bulk response generation that can create `500` to `800` realistic test responses for each seeded survey.
- [ ] Add a task path in the admin UI to generate sample answers for the demo surveys so each seeded survey can be populated with `500` to `800` responses.
- [ ] Make generated response values type-correct and varied enough to exercise aggregate counts, rating distributions, and text-response listings.
- [ ] Support running the admin UI bulk-response option against the surveys created from `docs/plans/survey_studio_demo_surveys.md` without manual survey-by-survey setup.
- [ ] Match the analytics metrics, per-question panels, chart palette, labels, and non-color-only identification requirements in `docs/plans/DESIGN.md`.
- [ ] Add or update Playwright tests for:
  - Viewing aggregate results as the survey creator
  - Verifying charts render expected labels or values
  - Verifying response count updates after a new response
  - Running the full required product flow: registration, fresh-browser login, survey creation, 10 public responses in separate sessions, creator login, and analytics validation
- [ ] Add UI-focused backend or integration verification for the admin seed plus bulk-response flow proving an admin can create demo surveys and generate sample answers that populate each with `500` to `800` responses from the product interface.
- [ ] Run:
  ```bash
  cd frontend
  npx playwright test tests/analytics.spec.js tests/full-product-flow.spec.js --project=chromium
  ```
- [ ] Definition of done: paste a Playwright snippet confirming analytics behavior, for example:
  ```text
  [chromium] › tests/analytics.spec.js › Analytics › displays aggregate survey results
  [chromium] › tests/analytics.spec.js › Analytics › updates the response count after submission
  [chromium] › tests/full-product-flow.spec.js › Full product flow › creator can collect 10 responses and validate analytics
  3 passed
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

### Stage 7: Security, Validation, And Polish
- [ ] Add rate limiting or abuse protection for public survey URLs.
- [ ] Harden backend validation for survey creation, questions, responses, and auth.
- [ ] Confirm users cannot access or mutate surveys they do not own.
- [ ] Add frontend error states for validation and authorization failures.
- [ ] Audit frontend loading, empty, error, unauthorized, closed survey, invalid URL, keyboard focus, and responsive states against `docs/plans/DESIGN.md`.
- [ ] Add or update Playwright tests for:
  - Unauthorized access to another user's survey dashboard data
  - Invalid survey URL handling
  - Closed survey response blocking
  - User-facing validation messages
- [ ] Run the full Playwright suite:
  ```bash
  cd frontend
  npx playwright test
  ```
- [ ] Definition of done: paste a Playwright snippet confirming the full suite passes, for example:
  ```text
  Running <n> tests using <n> workers
  <n> passed
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

### Stage 8: Final Verification
- [ ] Run backend tests:
  ```bash
  cd backend
  source venv/bin/activate
  pytest
  ```
- [ ] Run frontend build:
  ```bash
  cd frontend
  npm run build
  ```
- [ ] Run the complete Playwright test suite:
  ```bash
  cd frontend
  npx playwright test
  ```
- [ ] Confirm the required end-to-end product flows pass in the full Playwright suite.
- [ ] Perform a final product UI pass against `docs/plans/DESIGN.md` before release notes are written.
- [ ] Definition of done: include final verification snippets in the release notes:
  ```text
  backend: <pytest summary>
  frontend: built successfully
  playwright: <n> passed
  ```
- [ ] Commit the current state of code in meaningful small batches with appropriate commit messages.

## Testing Strategy
- **Backend**: Pytest for unit and integration tests.
- **Frontend**: Vitest/Jest and React Testing Library where component-level feedback is useful.
- **E2E**: Playwright for every user-facing feature.

## Required End-To-End Product Flows
Create Playwright flows that validate the full creator and respondent journey across separate browser sessions. These flows should use realistic user interactions through the UI, not direct database setup, except for test cleanup or deterministic seeding when unavoidable.

### Flow 1: Registration And First Login
- Register a new creator account with a unique email address.
- Verify the user lands in the authenticated creator experience after registration.
- Close that browser context.
- Open a new browser context with no shared storage.
- Log in with the newly registered account.
- Verify the creator dashboard loads for that account.

### Flow 2: Create And Publish Survey
- Starting from a logged-in creator session, create a new survey.
- Add enough questions to cover the supported response types used by analytics, including at least one choice-based question and one free-text or rating question.
- Save or publish the survey.
- Capture the public share URL from the UI.
- Verify the survey appears in the creator dashboard with the expected title and active or shareable state.

### Flow 3: Public Survey Responses In Fresh Sessions
- Open the public share URL in a new unauthenticated browser context.
- Confirm the public survey can be viewed without creator login.
- Submit a complete response.
- Repeat until the survey has 10 total submitted responses.
- Use a fresh browser context for each response unless the product explicitly supports multiple submissions from one respondent session.
- Vary answer values enough for analytics assertions to prove aggregation, counts, and labels are correct.

### Flow 4: Login Again And Validate Analytics
- Open another fresh browser context.
- Log in again as the original survey creator.
- Navigate to the survey analytics/results view.
- Verify the total response count is 10.
- Verify per-question analytics reflect the submitted response set, including choice counts and any supported rating/text summaries.
- Verify analytics remain scoped to the logged-in creator and the created survey.

## Playwright Test Rules For Every Feature
- Each feature stage must add or update at least one Playwright spec under `frontend/tests/`.
- Each feature stage must run the relevant Playwright spec before committing.
- Each feature stage must record a small Playwright output snippet proving the feature works.
- Put the full creator/respondent/analytics journey in `frontend/tests/full-product-flow.spec.js` unless the test suite has a clearer established naming convention.
- Full-journey specs should use separate Playwright browser contexts for registration/login, public respondent sessions, and the final creator analytics validation.
- Use deterministic test data names and unique account identifiers so repeated runs do not collide.
- The preferred feature-level command is:
  ```bash
  cd frontend
  npx playwright test tests/<feature>.spec.js --project=chromium
  ```
- The final verification command is:
  ```bash
  cd frontend
  npx playwright test
  ```
