# Phase 6-1: Analytics API and Charts — To-Do

## Tasks

### C1 — Analytics API
- [ ] Create GET /api/surveys/{id}/analytics endpoint
- [ ] Aggregate response data per question
- **Commit after completion**: `feat: add analytics API`

### C2 — Response counting
- [ ] Create GET /api/surveys/{id}/count endpoint
- [ ] Return total response count
- **Commit after completion**: `feat: add response counting API`

### C3 — Chart.js integration
- [ ] Create src/components/AnalyticsChart.jsx
- [ ] Configure Chart.js with DESIGN.md color palette
- **Commit after completion**: `feat: add Chart.js analytics component`

### C4 — Per-question panels
- [ ] Create question-level analytics panels
- [ ] Show choice distributions, rating histograms, text summaries
- **Commit after completion**: `feat: add per-question analytics panels`

### C5 — Creator analytics dashboard
- [ ] Create src/pages/AnalyticsDashboard.jsx
- [ ] Aggregate all survey analytics in one view
- **Commit after completion**: `feat: add analytics dashboard`

### C6 — Verification
- [ ] Run Playwright analytics tests
- **Commit after completion**: `test: verify analytics`
