# Phase 1-2: Frontend Foundation — To-Do

## Tasks

### C1 — React/Vite project and dependencies
- [ ] Initialize Vite React project in frontend/
- [ ] Install dependencies: react, react-dom, tailwindcss, postcss, autoprefixer, zustand
- [ ] Configure vite.config.js with proxy to backend port 6030
- **Commit after completion**: `feat: initialize React/Vite frontend project`

### C2 — Tailwind CSS and DESIGN tokens
- [ ] Configure tailwind.config.js with colors, typography, spacing from DESIGN.md
- [ ] Create src/index.css with Tailwind directives and DESIGN tokens
- [ ] Create src/App.jsx with base layout shell
- **Commit after completion**: `feat: configure Tailwind CSS with DESIGN tokens`

### C3 — Zustand state store and routing
- [ ] Create src/store/authStore.js (auth state)
- [ ] Create src/store/surveyStore.js (survey state)
- [ ] Set up React Router with protected/unprotected routes
- **Commit after completion**: `feat: add Zustand stores and routing`

### C4 — App shell layout
- [ ] Build main layout: sidebar navigation, top bar, content area
- [ ] Follow DESIGN.md spacing, radius, and responsive rules
- [ ] Create placeholder pages: Login, Register, Dashboard (empty state)
- **Commit after completion**: `feat: build app shell layout`

### C5 — Smoke test and verification
- [ ] Create frontend/tests/smoke.spec.js with app shell load test
- [ ] Run `npx playwright test tests/smoke.spec.js --project=chromium`
- **Commit after completion**: `test: add and pass smoke test`
