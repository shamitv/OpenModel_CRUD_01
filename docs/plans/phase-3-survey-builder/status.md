# Phase 3: Survey Builder — Status

| Checkpoint | Status | Notes |
|-----------|--------|-------|
| C1a — Survey schemas and slug generation | ✅ completed | `slugify()` with duplicate-slug numeric suffix |
| C1b — GET /api/surveys/my (list with pagination) | ✅ completed | |
| C1c — POST /api/surveys (create with auto-slug) | ✅ completed | |
| C1d — GET /api/surveys/{id} (full survey with nested questions) | ✅ completed | |
| C1e — PUT /api/surveys/{id} (update) | ✅ completed | Slug regenerated if title changes |
| C1f — DELETE /api/surveys/{id} (cascade delete) | ✅ completed | SQLAlchemy cascade configured |
| C2a — Define question type enum and schemas | ✅ completed | multiple_choice, short_text, long_text, rating |
| C2b — Question creation schema with validation | ✅ completed | |
| C2c — Type-specific validation (options, rating, text) | ✅ completed | Options: max 10, unique. Rating: min/max 1-5 |
| C3a — POST /api/surveys/{id}/questions (general) | ✅ completed | Auto-position based on existing count |
| C3b — Multiple choice validation | ✅ completed | |
| C3c — Rating validation | ✅ completed | |
| C4a — Short text question | ✅ completed | Max 500 chars |
| C4b — Long text question | ✅ completed | Max 2000 chars |
| C5a — GET /api/surveys/{id}/questions (ordered) | ✅ completed | Ordered by position field |
| C5b — PATCH /api/surveys/{id}/questions/reorder (bulk) | ✅ completed | |
| C5c — PATCH /api/surveys/{id}/questions/{id}/move-up | ✅ completed | Raw SQL swap |
| C5d — PATCH /api/surveys/{id}/questions/{id}/move-down | ✅ completed | Raw SQL swap |
| C6a — surveyApi.js (axios service) | ✅ completed | 9 endpoints, auth interceptors |
| C6b — surveyStore.js (migrate to axios) | ✅ completed | All actions migrated |
| C6c — SurveyBuilderPage (three-zone layout) | ✅ completed | Left sidebar, center canvas, right settings |
| C6d — SurveyBuilderHeader (title, description, save state) | ✅ completed | Auto-save debounce 2s |
| C6e — QuestionCard component | ✅ completed | Type selector, required toggle, actions |
| C6f — QuestionTypeEditor component | ✅ completed | Options inputs, rating range |
| C6g — QuestionActions component | ✅ completed | Move up/down, duplicate, delete |
| C6h — SaveStateIndicator component | ✅ completed | Saved/Saving/Unsaved states |
| C7a — SurveyPreviewPage (readonly view) | ✅ completed | |
| C7b — Progress indicator | ✅ completed | Shown for surveys with >3 questions |
| C7c — Validation states | ✅ completed | Required fields highlighted |
| C7d — Submit button and success state | ✅ completed | No actual submission (Phase 3) |
| C8a — Backend integration tests | ✅ completed | 45 tests all passing (14 auth + 31 survey) |
| C8b — Frontend smoke test — create survey | 📋 pending | |
| C8c — Frontend smoke test — reorder questions | 📋 pending | |
| C8d — Frontend smoke test — preview mode | 📋 pending | |
| C8e — Playwright E2E tests | 📋 pending | |
