# Phase 2-2: Frontend Authentication — To-Do

## Tasks

### C1 — Auth API service layer
- [ ] Create src/services/authApi.js with register, login, logout functions
- [ ] Configure API base URL to backend port 6030
- **Commit after completion**: `feat: add auth API service layer`

### C2 — Zustand auth store
- [ ] Extend authStore.js with register, login, logout actions
- [ ] Persist auth state in localStorage
- **Commit after completion**: `feat: extend auth store with actions`

### C3 — Registration form
- [ ] Create src/components/RegisterForm.jsx
- [ ] Implement email, password fields with validation
- [ ] Call auth API on submit
- **Commit after completion**: `feat: add registration form`

### C4 — Login form
- [ ] Create src/components/LoginForm.jsx
- [ ] Implement email, password fields with validation
- [ ] Call auth API on submit
- **Commit after completion**: `feat: add login form`

### C5 — Auth screens and routing
- [ ] Create src/pages/LoginPage.jsx and src/pages/RegisterPage.jsx
- [ ] Integrate with React Router for protected/unprotected routes
- **Commit after completion**: `feat: add auth screens and routing`

### C6 — Styling and verification
- [ ] Style auth screens per DESIGN.md (colors, spacing, typography, responsive)
- [ ] Run Playwright auth tests
- **Commit after completion**: `feat: style auth screens and verify`
