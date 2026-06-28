# Phase 8: Final Verification

## Overview
Final verification: run all tests, build the frontend, and validate the complete end-to-end product flow.

## Scope
- Backend pytest suite
- Frontend production build
- Full Playwright E2E test suite
- Product UI audit against DESIGN.md
- Release notes preparation

## Commit Checkpoints

### C1 — Backend tests
- Create comprehensive pytest test suite
- Run `cd backend && source venv/bin/activate && pytest`
- **Commit**: `test: add backend test suite`

### C2 — Frontend build
- Run `cd frontend && npm run build`
- Fix any build errors
- **Commit**: `chore: frontend production build passes`

### C3 — Full Playwright suite
- Run `cd frontend && npx playwright test`
- Verify all E2E flows pass
- **Commit**: `test: full Playwright suite passes`

### C4 — End-to-end product flow validation
- Validate all 4 required E2E flows:
  1. Registration and first login
  2. Create and publish survey
  3. Public survey responses in fresh sessions
  4. Login again and validate analytics
- **Commit**: `test: validate all E2E product flows`

### C5 — DESIGN.md final audit
- Perform final product UI pass against DESIGN.md
- Fix any remaining discrepancies
- **Commit**: `docs: final DESIGN.md compliance audit`

### C6 — Release notes
- Compile release notes with verification snippets
- **Commit**: `docs: add release notes`
