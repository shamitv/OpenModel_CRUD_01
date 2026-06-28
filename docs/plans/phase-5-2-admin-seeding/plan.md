# Phase 5-2: Admin Seeding

## Overview
Implement admin seeding tools: create test surveys from the demo survey bank and generate bulk synthetic responses.

## Scope
- Admin UI control to seed surveys from demo bank
- Bulk response generation (500-800 per survey)
- Type-correct answer generation
- Deterministic seeding for verification

## Commit Checkpoints

### C1 — Demo survey data loader
- Parse docs/plans/survey_studio_demo_surveys.md
- Create backend service to load demo survey definitions
- **Commit**: `feat: add demo survey data loader`

### C2 — Admin seed UI
- Create src/pages/AdminSeed.jsx
- List all demo surveys with create button
- **Commit**: `feat: add admin seed UI`

### C3 — Survey seeding API
- Create POST /api/admin/seed-survey endpoint
- Create survey from demo definition preserving question types, options, required flags
- **Commit**: `feat: add survey seeding API`

### C4 — Bulk response generation
- Create POST /api/admin/bulk-responses endpoint
- Generate 500-800 synthetic responses per seeded survey
- Generate type-correct answers (random choices, varied text, rating distributions)
- **Commit**: `feat: add bulk response generation API`

### C5 — Verification
- Seed a demo survey and verify it appears in dashboard
- Generate bulk responses and verify counts
- **Commit**: `test: verify admin seeding and bulk generation`
