# College Website Backend

Setup
1. Copy `.env.example` to `.env` and edit values.
2. Install deps: `npm install`
3. Run dev: `npm run dev`

API Base: `/api`

Key Routes
- Auth: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- Notices: `GET /notices`, `POST /notices` (teacher/admin)
- Departments: `GET /departments`, `POST/PUT/DELETE /departments/:id` (admin)
- Events: `GET /events`, `POST /events` (teacher/admin)
- Faculty: `GET /faculty`, `POST /faculty` (admin)
- Students: `GET /students`, `GET /students/:id`, `POST/PUT/DELETE /students/:id` (admin)
- Contact: `POST /contact`

Security & Middleware
- helmet, cors, rate-limit on /auth, xss-clean, mongo-sanitize


