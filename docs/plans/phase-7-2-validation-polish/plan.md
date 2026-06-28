# Phase 7-2: Validation and Polish

## Overview
Final validation hardening, UI polish, and comprehensive audit against DESIGN.md requirements.

## Scope
- Comprehensive input validation for all forms and APIs
- Frontend loading, empty, error, unauthorized, closed survey, invalid URL states
- Keyboard focus, responsive state audit
- Full UI audit against DESIGN.md

## Commit Checkpoints

### C1 — Comprehensive input validation
- Add client-side validation to all forms
- Add server-side Pydantic validation for all endpoints
- Handle edge cases: empty inputs, special characters, XSS prevention
- **Commit**: `feat: comprehensive input validation`

### C2 — UI state audit
- Loading states: spinners, skeleton screens
- Empty states: helpful messages with CTAs
- Error states: clear error messages with recovery options
- **Commit**: `feat: audit and implement UI states`

### C3 — Responsive and accessibility audit
- Audit all pages for responsive behavior
- Audit keyboard navigation and focus management
- Ensure ARIA labels and semantic HTML
- **Commit**: `feat: responsive and accessibility audit`

### C4 — DESIGN.md compliance audit
- Verify all components match DESIGN.md tokens
- Verify all required states are implemented
- **Commit**: `feat: DESIGN.md compliance audit`

### C5 — Verification
- Run full Playwright suite
- **Commit**: `test: full validation and polish verification`
