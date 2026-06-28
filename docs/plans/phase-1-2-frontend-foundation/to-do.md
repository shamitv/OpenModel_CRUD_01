# Phase 1-2: Frontend Foundation — To-Do

## Tasks

### C1 — React/Vite project and dependencies
- [x] Initialize Vite React project in frontend/
- [x] Install dependencies: react, react-dom, tailwindcss, postcss, autoprefixer, zustand
- [x] Configure vite.config.js with proxy to backend port 6030
- **Commit**: `feat: initialize React/Vite frontend project`

### C2 — Tailwind CSS and DESIGN tokens
- [x] Configure tailwind.config.js with colors, typography, spacing from DESIGN.md
- [x] Create src/index.css with Tailwind directives and DESIGN tokens
- [x] Create src/App.jsx with base layout shell
- **Commit**: `feat: configure Tailwind CSS with DESIGN tokens`

### C3 — Zustand state store and routing
- [x] Create src/store/authStore.js (auth state)
- [x] Create src/store/surveyStore.js (survey state)
- [x] Set up React Router with protected/unprotected routes
- **Commit**: `feat: add Zustand stores and routing`

### C4 — App shell layout
- [x] Build main layout: sidebar navigation, top bar, content area
- [x] Follow DESIGN.md spacing, radius, and responsive rules
- [x] Create placeholder pages: Login, Register, Dashboard (empty state)
- **Commit**: `feat: build app shell layout`

### C5 — Smoke test and verification
- [x] Create frontend/tests/smoke.spec.js with app shell load test
- [x] Run `npx playwright test tests/smoke.spec.js --project=chromium`
- **Commit**: `test: add and pass smoke test`
