# Phase 7-1: Security — To-Do

## Tasks

### C1 — Rate limiting
- [ ] Add rate limiting middleware for public survey endpoints
- [ ] Configure per-IP and per-URL limits
- **Commit after completion**: `feat: add rate limiting middleware`

### C2 — Access control
- [ ] Add ownership checks to all survey mutation endpoints
- [ ] Implement permission decorators/middleware
- **Commit after completion**: `feat: add access control and ownership checks`

### C3 — Input validation hardening
- [ ] Add Pydantic validation to all API request/response schemas
- [ ] Add input sanitization for survey titles, descriptions, URLs
- **Commit after completion**: `feat: harden input validation`

### C4 — Frontend error states
- [ ] Add error boundary components
- [ ] Handle validation and authorization errors in UI
- **Commit after completion**: `feat: add frontend error states`

### C5 — Verification
- [ ] Test unauthorized access attempts are blocked
- [ ] Test rate limiting kicks in
- **Commit after completion**: `test: verify security measures`
