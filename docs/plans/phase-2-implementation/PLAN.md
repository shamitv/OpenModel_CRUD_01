# Phase 2: Authentication Implementation

## Overview
Implement the complete authentication system for Survey Studio:
- **Phase 2-1**: Backend authentication (password hashing, JWT, protected routes, logout)
- **Phase 2-2**: Frontend authentication (auth store fix, form components, styled auth screens)

## Architecture

`
Phase 2-1: Backend Authentication
|  C1 — Password hashing helpers (bcrypt)
|  C2 — Registration + Login + Logout API endpoints
|  C3 — JWT token management
|  C4 — Protected route middleware
|  C5 — Verification

Phase 2-2: Frontend Authentication
|  C1 — Fix authStore (add setUser method)
|  C2 — Auth API service layer
|  C3 — RegisterForm component
|  C4 — LoginForm component
|  C5 — Auth screens and routing
|  C6 — Styling and verification
`

## Phase 2-1: Backend Authentication

### C1 — Password Hashing Helpers
**Files**: ackend/app/models/user.py, ackend/app/utils.py
- Add hash_password() and erify_password() helpers using bcrypt
- Create ackend/app/utils.py for reusable auth utilities
- **Commit**: eat: add password hashing helpers

### C2 — Auth API Endpoints (Register, Login, Logout)
**Files**: ackend/app/api/auth.py
- POST /api/auth/register — Create user with username, email, password
- POST /api/auth/login — Authenticate and return JWT token
- POST /api/auth/logout — Invalidate token (client-side cleanup + server tracking)
- **Commit**: eat: add registration, login, and logout endpoints

### C3 — JWT Token Management
**Files**: ackend/app/config.py, ackend/app/utils.py
- create_access_token(data: dict) — Generate JWT from claims
- decode_access_token(token: str) — Validate and decode JWT
- Reuse existing SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES from config
- **Commit**: eat: add JWT token management

### C4 — Protected Route Middleware
**Files**: ackend/app/deps.py
- get_current_user() dependency — Extract token from Authorization header, verify JWT, return User
- Apply to all protected endpoints (survey CRUD, etc.)
- **Commit**: eat: add protected route middleware

### C5 — Verification
- Test registration flow via curl
- Test login flow and verify JWT in response
- Test logout flow
- Test protected route without token (should 401)
- **Commit**: 	est: verify backend auth endpoints

## Phase 2-2: Frontend Authentication

### C1 — Fix Auth Store
**Files**: rontend/src/store/authStore.js
- Add missing setUser method (referenced in App.jsx:22)
- Add clearUser method for logout cleanup
- **Commit**: ix: add setUser method to auth store

### C2 — Auth API Service Layer
**Files**: rontend/src/services/authApi.js
- Ensure 
egister, login, logout, getCurrentUser methods match backend endpoints
- Add clearAuth() method for logout
- **Commit**: eat: update auth API service

### C3 — RegisterForm Component
**Files**: rontend/src/components/RegisterForm.jsx
- Extract registration form from RegisterPage
- Email, username, password fields with validation
- Call uthApi.register() on submit
- **Commit**: eat: extract register form component

### C4 — LoginForm Component
**Files**: rontend/src/components/LoginForm.jsx
- Extract login form from LoginPage
- Username, password fields with validation
- Call uthApi.login() on submit
- **Commit**: eat: extract login form component

### C5 — Auth Screens and Routing
**Files**: rontend/src/pages/LoginPage.jsx, RegisterPage.jsx, App.jsx
- Integrate LoginForm into LoginPage
- Integrate RegisterForm into RegisterPage
- Verify ProtectedRoute redirects unauthenticated users to /login
- **Commit**: eat: wire up auth screens and routing

### C6 — Styling and Verification
**Files**: rontend/src/pages/LoginPage.jsx, RegisterPage.jsx
- Style auth screens per DESIGN.md (colors, spacing, typography)
- Run Playwright smoke test
- **Commit**: eat: style auth screens and verify

## File Changes Summary

| File | Phase | Change |
|------|-------|--------|
| ackend/app/utils.py | 2-1 C1, C3 | New file: bcrypt helpers + JWT functions |
| ackend/app/models/user.py | 2-1 C1 | Add hash_password(), verify_password() methods |
| ackend/app/api/auth.py | 2-1 C2 | New file: register, login, logout endpoints |
| ackend/app/deps.py | 2-1 C4 | New file: get_current_user dependency |
| ackend/app/main.py | 2-1 C4 | Import and include auth routes |
| rontend/src/store/authStore.js | 2-2 C1 | Add setUser(), clearUser() |
| rontend/src/services/authApi.js | 2-2 C2 | Update methods, add clearAuth() |
| rontend/src/components/LoginForm.jsx | 2-2 C4 | New file: extracted login form |
| rontend/src/components/RegisterForm.jsx | 2-2 C3 | New file: extracted register form |
| rontend/src/pages/LoginPage.jsx | 2-2 C5 | Integrate LoginForm |
| rontend/src/pages/RegisterPage.jsx | 2-2 C5 | Integrate RegisterForm |

## Dependencies
- Phase 1-1 (Backend Foundation): Completed
- Phase 1-2 (Frontend Foundation): Completed
- Design system: docs/plans/DESIGN.md
- Existing User model already has hashed_password column (no migration needed)

## Risks and Notes
- crypt is already in 
equirements.txt — no dependency installation needed
- python-jose[cryptography] is already in 
equirements.txt — no dependency installation needed
- JWT settings already defined in config.py — no new config needed
- User model already has hashed_password column — no schema migration needed
- Frontend already has Login/ and Register/ pages — need to refactor into components
- setUser method is missing from authStore — must add before frontend can work
