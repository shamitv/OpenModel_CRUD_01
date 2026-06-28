# Phase 7-1: Security

## Overview
Add rate limiting, access control, ownership enforcement, and input validation hardening.

## Scope
- Rate limiting for public survey URLs
- Access control: users cannot access/mutate other users surveys
- Input validation hardening across all endpoints
- Frontend error states for validation and authorization failures

## Commit Checkpoints

### C1 — Rate limiting
- Add rate limiting middleware for public survey endpoints
- Configure per-IP and per-URL limits
- **Commit**: `feat: add rate limiting middleware`

### C2 — Access control
- Add ownership checks to all survey mutation endpoints
- Implement permission decorators/middleware
- **Commit**: `feat: add access control and ownership checks`

### C3 — Input validation hardening
- Add Pydantic validation to all API request/response schemas
- Add input sanitization for survey titles, descriptions, URLs
- **Commit**: `feat: harden input validation`

### C4 — Frontend error states
- Add error boundary components
- Handle validation and authorization errors in UI
- **Commit**: `feat: add frontend error states`

### C5 — Verification
- Test unauthorized access attempts are blocked
- Test rate limiting kicks in
- **Commit**: `test: verify security measures`
