# Phase 6-1: Analytics API and Charts

## Overview
Implement the analytics backend API and frontend visualization using Chart.js.

## Scope
- Results and analytics API endpoints
- Response counting endpoint
- Chart.js integration for visualizations
- Per-question analytics panels

## Commit Checkpoints

### C1 — Analytics API
- Create GET /api/surveys/{id}/analytics endpoint
- Aggregate response data per question
- **Commit**: `feat: add analytics API`

### C2 — Response counting
- Create GET /api/surveys/{id}/count endpoint
- Return total response count
- **Commit**: `feat: add response counting API`

### C3 — Chart.js integration
- Create src/components/AnalyticsChart.jsx
- Configure Chart.js with DESIGN.md color palette
- **Commit**: `feat: add Chart.js analytics component`

### C4 — Per-question panels
- Create question-level analytics panels
- Show choice distributions, rating histograms, text summaries
- **Commit**: `feat: add per-question analytics panels`

### C5 — Creator analytics dashboard
- Create src/pages/AnalyticsDashboard.jsx
- Aggregate all survey analytics in one view
- **Commit**: `feat: add analytics dashboard`

### C6 — Verification
- Run Playwright analytics tests
- **Commit**: `test: verify analytics`
