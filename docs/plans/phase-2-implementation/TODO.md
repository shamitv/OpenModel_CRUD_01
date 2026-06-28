# Phase 2: Authentication — To-Do

## Phase 2-1: Backend Authentication

### C1 — Password Hashing Helpers
- [ ] Create ackend/app/utils.py with hash_password(password: str) -> str and erify_password(password: str, hashed: str) -> bool using bcrypt
- [ ] Add hash_password() and erify_password() methods to ackend/app/models/user.py
- [ ] **Commit**: eat: add password hashing helpers

### C2 — Auth API Endpoints (Register, Login, Logout)
- [ ] Create ackend/app/api/auth.py
- [ ] POST /api/auth/register — Accept {username, email, password}, validate uniqueness, hash password, create user
- [ ] POST /api/auth/login — Accept {username, password}, verify password, create JWT, return {token, user}
- [ ] POST /api/auth/logout — Accept {token}, return 200 (client cleans up token)
- [ ] **Commit**: eat: add registration, login, and logout endpoints

### C3 — JWT Token Management
- [ ] Create create_access_token(data: dict) -> str in ackend/app/utils.py using config settings
- [ ] Create decode_access_token(token: str) -> dict in ackend/app/utils.py
- [ ] **Commit**: eat: add JWT token management

### C4 — Protected Route Middleware
- [ ] Create ackend/app/deps.py with get_current_user() dependency
- [ ] Extract Bearer token from Authorization header
- [ ] Decode and verify JWT, return User object
- [ ] Import auth routes in ackend/app/main.py
- [ ] **Commit**: eat: add protected route middleware

### C5 — Verification
- [ ] Register user via curl: POST /api/auth/register
- [ ] Login user via curl: POST /api/auth/login
- [ ] Verify JWT token in response
- [ ] Test protected route without token -> 401
- [ ] Test logout via curl
- [ ] **Commit**: 	est: verify backend auth endpoints

---

## Phase 2-2: Frontend Authentication

### C1 — Fix Auth Store
- [ ] Add setUser(user) method to uthStore.js
- [ ] Add clearUser() method for logout cleanup
- [ ] **Commit**: ix: add setUser method to auth store

### C2 — Auth API Service Layer
- [ ] Update uthApi.js to ensure all methods match backend endpoints
- [ ] Add clearAuth() method for logout (remove token/user from localStorage)
- [ ] **Commit**: eat: update auth API service

### C3 — RegisterForm Component
- [ ] Create rontend/src/components/RegisterForm.jsx
- [ ] Extract email, username, password fields from RegisterPage
- [ ] Add field validation (required, email format, password length)
- [ ] Call uthApi.register() on submit
- [ ] **Commit**: eat: extract register form component

### C4 — LoginForm Component
- [ ] Create rontend/src/components/LoginForm.jsx
- [ ] Extract username, password fields from LoginPage
- [ ] Add field validation (required, non-empty)
- [ ] Call uthApi.login() on submit
- [ ] **Commit**: eat: extract login form component

### C5 — Auth Screens and Routing
- [ ] Integrate LoginForm into LoginPage
- [ ] Integrate RegisterForm into RegisterPage
- [ ] Verify ProtectedRoute redirects unauthenticated users to /login
- [ ] Verify authenticated users are redirected away from /login and /register
- [ ] **Commit**: eat: wire up auth screens and routing

### C6 — Styling and Verification
- [ ] Style auth screens per DESIGN.md (colors, spacing, typography, responsive)
- [ ] Run Playwright smoke test
- [ ] **Commit**: eat: style auth screens and verify

---

## Implementation Order
Phase 2-1 C1 -> C2 -> C3 -> C4 -> C5
Phase 2-2 C1 -> C2 -> C3 -> C4 -> C5 -> C6

Phase 2-2 C1 can run in parallel with Phase 2-1 since it is a standalone fix.
