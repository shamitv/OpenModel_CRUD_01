# Phase 6-2: Realtime Counts and Bulk Generation — To-Do

## Tasks

### C1 — Realtime response counting
- [ ] Implement polling-based count updates (auto-refresh every N seconds)
- [ ] Or implement WebSocket endpoint for realtime updates
- **Commit after completion**: `feat: add realtime response counting`

### C2 — Bulk response generation API
- [ ] Create POST /api/admin/bulk-responses endpoint
- [ ] Accept survey_id parameter for targeted generation
- **Commit after completion**: `feat: add bulk response generation API`

### C3 — Type-correct answer generation
- [ ] Generate random choices for multiple-choice questions
- [ ] Generate varied text for text questions
- [ ] Generate rating distributions for rating questions
- **Commit after completion**: `feat: add type-correct answer generation`

### C4 — Admin UI controls
- [ ] Create bulk generation controls in admin UI
- [ ] Progress indicator during generation
- **Commit after completion**: `feat: add admin bulk generation UI`

### C5 — Verification
- [ ] Generate bulk responses and verify counts (500-800)
- [ ] Verify type-correct answers
- **Commit after completion**: `test: verify realtime and bulk generation`
