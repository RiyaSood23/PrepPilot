# PrepPilot

**Placement & Company Tracking System**

PrepPilot is a full-stack web application for managing campus placement drives, tracking company requirements, checking student eligibility, and handling job applications. The current codebase uses Node.js, Express, MongoDB, Mongoose, bcrypt, and JWT.

---

## Overview

PrepPilot provides separate workflows for admins and students:

- Admins can add, view, delete, and download companies.
- Students can register, login, check eligibility, and apply to eligible companies.
- The backend stores data in MongoDB instead of JSON files.
- Passwords are hashed with bcrypt and protected routes use JWT authentication.

---

## Key Features

- MongoDB-backed company, student, user, and application models
- Company management with openings and applied count tracking
- Student application workflow with duplicate prevention
- Eligibility checks based on CGPA and skills
- Static frontend built with HTML, CSS, and vanilla JavaScript
- Centralized Express error handling

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- dotenv

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

---

## Quick Start

### Prerequisites

- Node.js installed
- MongoDB running locally or a MongoDB Atlas URI

### Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/preppilot
SECRET_KEY=your_super_secret_jwt_key_here
```

3. Start the server:

```bash
npm start
```

4. Open the app:

- Home: http://localhost:3000
- Login: http://localhost:3000/login.html
- Admin: http://localhost:3000/admin.html
- Student: http://localhost:3000/student.html

---

## Project Structure

```text
PrepPilot/
├── server.js
├── package.json
├── .env.example
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── company.controller.js
│   ├── student.controller.js
│   └── application.controller.js
├── middlewares/
│   ├── auth.js
│   ├── role.js
│   └── logger.js
├── models/
│   ├── company.model.js
│   ├── company.js
│   ├── student.js
│   ├── application.js
│   └── user.js
├── routes/
│   ├── auth.routes.js
│   ├── company.routes.js
│   └── student.routes.js
├── public/
│   ├── index.html
│   ├── login.html
│   ├── admin.html
│   ├── student.html
│   ├── css/
│   └── js/
└── data/
    ├── companies.json
    └── students.json
```

---

## How It Works

1. `server.js` loads environment variables and connects to MongoDB.
2. Express serves static frontend files from `public/`.
3. API routes are mounted for auth, students, and companies.
4. Controllers handle validation, business logic, and database queries.
5. Middleware checks authentication and role before protected actions.
6. Responses are returned as JSON with clear status codes.

---

## API Endpoints

### Auth

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login`    | Login a user    |

### Students

| Method | Endpoint                                    | Description               |
| ------ | ------------------------------------------- | ------------------------- |
| `POST` | `/api/students/register`                    | Register a student        |
| `POST` | `/api/students/login`                       | Login a student           |
| `GET`  | `/api/students/eligibility`                 | Check company eligibility |
| `POST` | `/api/students/apply`                       | Apply to a company        |
| `GET`  | `/api/students/applications`                | Get student applications  |
| `GET`  | `/api/students/applications/:applicationId` | Get a single application  |

### Companies

| Method   | Endpoint                  | Description             |
| -------- | ------------------------- | ----------------------- |
| `GET`    | `/api/companies`          | Get all companies       |
| `POST`   | `/api/companies`          | Add a company           |
| `DELETE` | `/api/companies/:id`      | Delete a company        |
| `GET`    | `/api/companies/download` | Download companies data |

For protected routes, send the JWT token in the Authorization header:

```text
Authorization: Bearer <token>
```

---

## Main Data Models

### Company

- `name`
- `role`
- `minCgpa`
- `location`
- `package`
- `openings`
- `appliedCount`

### Student

- `name`
- `email`
- `password`
- `cgpa`
- `skills`
- `role`

### Application

- `student`
- `job`
- `status`
- `appliedAt`

---

## Usage Flow

### Admin

1. Open `login.html` and choose the Admin tab.
2. Login and go to the admin dashboard.
3. Add or delete companies.
4. View company cards with openings and applied counts.

### Student

1. Open `login.html` and choose the Student tab.
2. Register or login.
3. View companies and eligibility state.
4. Apply only to eligible companies.
5. View submitted applications.

---

## Notes

- The project now uses MongoDB rather than JSON file storage for core data.
- JWT and bcrypt are used for authentication security.
- Frontend is static and communicates with the backend through fetch requests.

---

## Team

- Riya: Database connection, company model, company controllers
- Joy: Authentication middleware, JWT, role guards
- Meghna: Student and application flow
- Jia: Frontend pages and integration

---

**Built with ❤️ for streamlined campus placements**
