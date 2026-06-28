# Phase 6-2: Realtime Counts and Bulk Generation

## Overview
Implement realtime response counting (polling or WebSockets) and bulk response generation for demo surveys.

## Scope
- Realtime response count updates via polling or WebSockets
- Bulk response generation (500-800 per survey)
- Admin UI controls for bulk generation
- Type-correct varied answer generation

## Commit Checkpoints

### C1 — Realtime response counting
- Implement polling-based count updates (auto-refresh every N seconds)
- Or implement WebSocket endpoint for realtime updates
- **Commit**: `feat: add realtime response counting`

### C2 — Bulk response generation API
- Create POST /api/admin/bulk-responses endpoint
- Accept survey_id parameter for targeted generation
- **Commit**: `feat: add bulk response generation API`

### C3 — Type-correct answer generation
- Generate random choices for multiple-choice questions
- Generate varied text for text questions
- Generate rating distributions for rating questions
- **Commit**: `feat: add type-correct answer generation`

### C4 — Admin UI controls
- Create bulk generation controls in admin UI
- Progress indicator during generation
- **Commit**: `feat: add admin bulk generation UI`

### C5 — Verification
- Generate bulk responses and verify counts (500-800)
- Verify type-correct answers
- **Commit**: `test: verify realtime and bulk generation`
