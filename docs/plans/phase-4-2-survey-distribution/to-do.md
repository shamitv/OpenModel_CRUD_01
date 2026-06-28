# Phase 4-2: Survey Distribution — To-Do

## Tasks

### C1 — Unique URL generation
- [ ] Implement URL slug generation (survey_id or short hash)
- [ ] Create GET /api/surveys/{slug}/public endpoint
- **Commit after completion**: `feat: add unique URL generation`

### C2 — Public survey view API
- [ ] Create public survey data endpoint (questions only, no auth)
- **Commit after completion**: `feat: add public survey view API`

### C3 — Public respondent UI
- [ ] Create src/pages/PublicSurvey.jsx
- [ ] Display questions as respondent sees them
- [ ] No authentication required
- **Commit after completion**: `feat: add public survey respondent UI`

### C4 — URL validation and error handling
- [ ] Handle invalid/missing URL slugs
- [ ] Show 404 for non-existent surveys
- **Commit after completion**: `feat: add URL validation and error handling`

### C5 — Verification
- [ ] Run Playwright survey-distribution tests
- [ ] Verify public URL works without login
- **Commit after completion**: `test: verify survey distribution`
