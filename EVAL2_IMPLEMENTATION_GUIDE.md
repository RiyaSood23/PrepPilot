# PrepPilot Eval-2 Implementation Guide

This document is the single source of truth for Eval-2.
Use it to understand what we are building, what is changing from Eval-1, who owns what, and how each member can use AI agents to complete tasks quickly.

---

## 1) Current Status (Eval-1)

PrepPilot currently works as a basic placement system.

### Admin can:

- Add a company
- Delete a company
- View all companies
- Download company data

### Student can:

- Register profile
- View companies
- Check eligibility using CGPA threshold

### Current limitations:

- Data is stored in JSON files (`data/companies.json`, `data/students.json`)
- No authentication (no login)
- No real apply workflow
- Frontend and backend are only partially integrated for real user flows

One-line summary:
Eval-1 is a working prototype with basic CRUD + eligibility check using file storage.

---

## 2) Eval-2 Goal

We are not rebuilding from scratch. We are upgrading the existing system into a production-style backend workflow.

One-line summary:
Eval-2 converts the prototype into a real system with database, authentication, middleware, and application tracking.

---

## 3) What Must Be Added in Eval-2

### A. Database migration

- Replace JSON storage with MongoDB.
- Use Mongoose models for all major entities.

### B. Authentication and authorization

- Student and Admin login.
- Password hashing with `bcrypt`.
- Session/token management with JWT.
- Protected routes for role-based access.

### C. Real application flow

- Students can apply to companies.
- Application should be stored persistently.
- Prevent duplicate applications.
- Enforce eligibility before applying.

### D. Counters and analytics fields

- Track company openings.
- Track number of applications per company.
- Example display: `10 applied / 20 openings`.

### E. Middleware architecture

- Request logger middleware.
- Auth middleware (JWT verify + role checks).
- Error-handling middleware.

### F. Dynamic rendering

- Add at least one EJS-rendered page backed by real server data.

### G. Login persistence

- Keep users logged in via token strategy (JWT in Authorization header or cookie-based token flow).

---

## 4) Recommended Tech Stack for Eval-2

- Backend framework: Express.js
- Database: MongoDB
- ODM: Mongoose
- Auth security: bcrypt + JWT
- Middleware: Express middleware chain
- Frontend integration: HTML/CSS/JS + Fetch API
- Template engine: EJS

## 5) Proposed Data Models (MongoDB + Mongoose)

These schemas are intentionally simple and sufficient for Eval-2.

### Company

- `name: String`
- `role: String`
- `minCgpa: Number`
- `location: String`
- `package: String`
- `openings: Number` (default: 0)
- `appliedCount: Number` (default: 0)
- `createdBy: ObjectId (Admin/User)`
- `createdAt, updatedAt`

### Student

- `name: String`
- `email: String` (unique)
- `passwordHash: String`
- `branch: String`
- `skills: [String]`
- `cgpa: Number`
- `role: String` (default: `student`)
- `createdAt, updatedAt`

### Admin

Option 1 (recommended for faster delivery):

- Reuse a generic `User` model with role values (`admin`, `student`).

Option 2:

- Separate `Admin` collection.

### Application

- `studentId: ObjectId`
- `companyId: ObjectId`
- `status: String` (default: `applied`)
- `appliedAt: Date`

Index requirement:

- Add unique compound index on `(studentId, companyId)` to prevent duplicate apply.

---

## 6) API Design for Eval-2 (Suggested)

Keep existing endpoints if possible to reduce frontend breakage, then add new auth + apply routes.

### Auth

- `POST /api/auth/register` (student registration)
- `POST /api/auth/login` (student/admin login)
- `GET /api/auth/me` (current user, protected)

### Company

- `GET /api/companies` (public/student)
- `POST /api/companies` (admin only)
- `DELETE /api/companies/:id` (admin only)
- `GET /api/companies/download` (admin only)

### Students

- `GET /api/students/:id` (self/admin)
- Optional: `GET /api/students/check/:studentId/:companyId` (compatibility route)

### Applications

- `POST /api/applications` (student only)
- `GET /api/applications/me` (student only)
- Optional admin view: `GET /api/applications/company/:companyId` (admin only)

---

## 7) Required Business Rules

1. Only admin can add/delete companies.
2. Only authenticated students can apply.
3. Student can apply only if `student.cgpa >= company.minCgpa`.
4. Student cannot apply to same company twice.
5. If `appliedCount >= openings`, application should be rejected.
6. On successful apply, increment company `appliedCount`.

---

## 8) Team Ownership and Deliverables

This mapping continues each member's Eval-1 work to avoid rework.

## Joy (Backend Core + Security)

### Owns:

- Middleware and secure route control.

### Tasks:

- Build logger middleware.
- Build JWT auth middleware.
- Build role guard middleware (`isAdmin`, `isStudent`).
- Build centralized error middleware.
- Implement login with bcrypt + JWT.
- Protect admin and student routes.

### Done means:

- All sensitive routes are protected and return correct status codes.

---

## Riya (Database + Company System)

### Owns:

- MongoDB connection and company module migration.

### Tasks:

- Setup DB connection utility.
- Create Company model.
- Replace JSON logic with MongoDB queries.
- Update add/delete/get/download company logic.
- Add `openings` and `appliedCount` support.

### Done means:

- Company data is fully database-driven with no dependency on JSON files.

---

## Meghna (Student + Application System)

### Owns:

- Student auth flow and application logic.

### Tasks:

- Create Student/User model and Application model.
- Implement register + login integration with auth module.
- Implement apply endpoint.
- Enforce eligibility and duplicate checks.
- Add endpoint to fetch student's applied companies.

### Done means:

- Student can securely register, login, and apply once per eligible company.

---

## Jia (Frontend Integration)

### Owns:

- Full frontend-backend integration.

### Tasks:

- Remove localStorage-based fake flows.
- Integrate forms with backend APIs via fetch.
- Add login page/UI state for authenticated users.
- Wire add/delete company, register/login, apply actions.
- Show API-driven data and error states.

### Done means:

- Frontend reflects real backend state and supports full user journey.

---

## 9) Suggested Implementation Order

1. Setup MongoDB + Mongoose + env config.
2. Add User/Student + Company + Application models.
3. Add auth APIs (register/login/me) and middleware.
4. Migrate company controller routes to DB.
5. Build application APIs with eligibility and duplicate checks.
6. Integrate frontend fetch flows.
7. Add one EJS page rendered from backend.
8. Test end-to-end user stories.

---

## 10) Definition of Done (Eval-2)

Eval-2 is complete only if all items below are true:

- No critical feature uses JSON file storage.
- Login works for student/admin and protects routes correctly.
- Student apply flow is real and persisted.
- Duplicate and ineligible applications are blocked.
- Company counters are accurate.
- At least one EJS dynamic page is implemented.
- Frontend is connected to backend APIs (no dummy-only behavior).

---

## 11) Testing Checklist

- Register student -> login -> token received.
- Admin login -> add company -> delete company.
- Student sees companies and applies to eligible one.
- Reapply to same company fails.
- Apply with low CGPA fails.
- Apply to full company (no openings) fails.
- `appliedCount` updates correctly after successful apply.

---

## 12) AI-Agent Prompt Templates (Copy-Paste)

Each teammate can paste the relevant prompt directly to their coding AI.

### Prompt for Joy

Implement middleware and auth security for an Express placement app.
Requirements: logger middleware, JWT auth middleware, role-based guards (`admin`, `student`), centralized error middleware, bcrypt password verification, login endpoint, and protected routes for company/admin + application/student actions. Keep APIs RESTful, return clear status codes and JSON errors, and avoid breaking existing route structure.

### Prompt for Riya

Migrate company module from JSON file storage to MongoDB using Mongoose in an Express app.
Requirements: create DB connection config, Company schema/model with `openings` and `appliedCount`, update add/get/delete/download company controllers to use DB, preserve existing endpoint behavior where possible, and add validation with clean error responses.

### Prompt for Meghna

Implement student authentication and application workflow in an Express + MongoDB app.
Requirements: Student/User model, Application model with unique `(studentId, companyId)`, register/login integration, apply endpoint with eligibility check (`cgpa >= minCgpa`), duplicate prevention, opening capacity check, and endpoint to list current student's applications.

### Prompt for Jia

Integrate frontend pages with backend APIs for auth, company, and applications.
Requirements: remove localStorage-only mock logic, use fetch for register/login/add/delete/apply, store and send auth token properly, update UI states based on login role, display API errors, and ensure pages work on reload with authenticated session flow.

---

## 13) Final Team Message

Use this exact message in team sync:

"Eval-1 gave us a working prototype using JSON. Eval-2 upgrades the same project into a real system with MongoDB, login security, middleware, and real application tracking. Everyone will extend their previous module, not rebuild from zero."

Simple line:
Eval-1 = working system.
Eval-2 = real system.
