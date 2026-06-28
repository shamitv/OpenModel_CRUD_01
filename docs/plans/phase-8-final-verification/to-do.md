# Phase 8: Final Verification — To-Do

## Tasks

### C1 — Backend tests
- [ ] Create comprehensive pytest test suite
- [ ] Run `cd backend && source venv/bin/activate && pytest`
- **Commit after completion**: `test: add backend test suite`

### C2 — Frontend build
- [ ] Run `cd frontend && npm run build`
- [ ] Fix any build errors
- **Commit after completion**: `chore: frontend production build passes`

### C3 — Full Playwright suite
- [ ] Run `cd frontend && npx playwright test`
- [ ] Verify all E2E flows pass
- **Commit after completion**: `test: full Playwright suite passes`

### C4 — End-to-end product flow validation
- [ ] Validate all 4 required E2E flows:
  1. Registration and first login
  2. Create and publish survey
  3. Public survey responses in fresh sessions
  4. Login again and validate analytics
- **Commit after completion**: `test: validate all E2E product flows`

### C5 — DESIGN.md final audit
- [ ] Perform final product UI pass against DESIGN.md
- [ ] Fix any remaining discrepancies
- **Commit after completion**: `docs: final DESIGN.md compliance audit`

### C6 — Release notes
- [ ] Compile release notes with verification snippets
- **Commit after completion**: `docs: add release notes`
