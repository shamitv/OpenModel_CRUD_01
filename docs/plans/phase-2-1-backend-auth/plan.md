# Phase 2-1: Backend Authentication

## Overview
Implement the backend authentication system: user registration, login, password hashing, and JWT token issuance/verification.

## Scope
- User registration API endpoint
- User login API endpoint
- Password hashing with bcrypt or similar
- JWT access token issuance and validation
- Protected route middleware
- User model updates with password field

## Commit Checkpoints

### C1 — User model with password hashing
- Add password_hash column to User model
- Add bcrypt/hashlib dependency to requirements.txt
- Implement hash_password() and verify_password() helpers
- **Commit**: `feat: add password hashing to User model`

### C2 — Registration and login API endpoints
- Create backend/app/api/auth.py with register and login endpoints
- Implement user registration with email validation
- Implement login with JWT token generation
- **Commit**: `feat: add registration and login API endpoints`

### C3 — JWT token management
- Create backend/app/config.py JWT settings (SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES)
- Implement create_access_token() and get_current_user() middleware
- Add token refresh endpoint if needed
- **Commit**: `feat: add JWT token management`

### C4 — Protected route middleware
- Create backend/app/deps.py with get_current_user dependency
- Apply dependency to protected routes
- **Commit**: `feat: add protected route middleware`

### C5 — Verification
- Test registration and login flows via curl
- Verify JWT tokens are issued and validated
- **Commit**: `test: verify backend auth endpoints work`
