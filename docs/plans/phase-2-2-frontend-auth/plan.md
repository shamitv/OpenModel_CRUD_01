# Phase 2-2: Frontend Authentication

## Overview
Build the frontend authentication UI: registration form, login form, auth state management, and styled auth screens.

## Scope
- Registration form component
- Login form component
- Auth state management in Zustand
- Auth screen styling per DESIGN.md
- Protected route redirect logic on frontend
- Auth API integration

## Commit Checkpoints

### C1 — Auth API service layer
- Create src/services/authApi.js with register, login, logout functions
- Configure API base URL to backend port 6030
- **Commit**: `feat: add auth API service layer`

### C2 — Zustand auth store
- Extend authStore.js with register, login, logout actions
- Persist auth state in localStorage
- **Commit**: `feat: extend auth store with actions`

### C3 — Registration form
- Create src/components/RegisterForm.jsx
- Implement email, password fields with validation
- Call auth API on submit
- **Commit**: `feat: add registration form`

### C4 — Login form
- Create src/components/LoginForm.jsx
- Implement email, password fields with validation
- Call auth API on submit
- **Commit**: `feat: add login form`

### C5 — Auth screens and routing
- Create src/pages/LoginPage.jsx and src/pages/RegisterPage.jsx
- Integrate with React Router for protected/unprotected routes
- **Commit**: `feat: add auth screens and routing`

### C6 — Styling and verification
- Style auth screens per DESIGN.md (colors, spacing, typography, responsive)
- Run Playwright auth tests
- **Commit**: `feat: style auth screens and verify`
