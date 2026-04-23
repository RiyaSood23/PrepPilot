# PrepPilot

**Placement & Company Tracking System**
A full-stack web application for managing campus placement drives, tracking company requirements, and checking student eligibility.

---

## 🎯 Overview

PrepPilot is a comprehensive placement management system designed for colleges to streamline the placement process. It provides separate portals for administrators and students, with real-time eligibility checking based on company requirements.

### Key Features

- **Company Management**: Add, view, and delete recruiting companies with detailed information
- **Student Registration**: Register students with their academic and skill profiles
- **Eligibility Checker**: Instantly verify student eligibility for companies based on CGPA requirements
- **Admin Dashboard**: Manage all placement-related data in one place
- **Student Portal**: Students can register and check their eligibility for companies
- **JSON File Storage**: Lightweight data persistence without database setup

---

## 🚀 Quick Start

1. **Install dependencies:**

```bash
npm install
```

2. **Start the server:**

```bash
npm start
```

3. **Access the application:**
   - **Landing Page**: http://localhost:3000
   - **Admin Portal**: http://localhost:3000/admin.html
   - **Student Portal**: http://localhost:3000/student.html

---

## 📁 Project Structure

```
PrepPilot/
│
├── server.js                    # Express server & API setup
├── package.json                 # Dependencies & scripts
│
├── routes/                      # API route definitions
│   ├── company.routes.js        # Company-related endpoints
│   └── student.routes.js        # Student-related endpoints
│
├── controllers/                 # Business logic layer
│   ├── company.controller.js    # Company CRUD operations
│   └── student.controller.js    # Student registration & eligibility
│
├── data/                        # JSON-based data storage
│   ├── companies.json           # Company records
│   └── students.json            # Student records
│
└── public/                      # Frontend static files
    ├── index.html               # Landing page
    ├── admin.html               # Admin dashboard
    ├── student.html             # Student portal
    ├── css/                     # Stylesheets
    │   ├── index.css
    │   ├── admin.css
    │   ├── student.css
    │   └── styles.css
    └── js/                      # Client-side scripts
        ├── admin.js
        └── student.js
```

---

## 🔌 API Endpoints

### Company Management

| Method   | Endpoint                  | Description             |
| -------- | ------------------------- | ----------------------- |
| `GET`    | `/api/companies`          | Get all companies       |
| `POST`   | `/api/companies`          | Add a new company       |
| `DELETE` | `/api/companies/:id`      | Delete a company by ID  |
| `GET`    | `/api/companies/download` | Download companies data |

**Add Company Request Body:**

```json
{
  "name": "Google",
  "role": "Software Engineer",
  "minCgpa": 7.5,
  "location": "Bangalore",
  "package": "25 LPA"
}
```

### Student Management

| Method | Endpoint                                    | Description            |
| ------ | ------------------------------------------- | ---------------------- |
| `POST` | `/api/students`                             | Register a new student |
| `GET`  | `/api/students/check/:studentId/:companyId` | Check eligibility      |

**Register Student Request Body:**

```json
{
  "name": "Riya Sood",
  "branch": "CSE",
  "skills": ["JavaScript", "React", "Node.js"],
  "cgpa": 8.5
}
```

---

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: JSON file-based persistence
- **API**: RESTful architecture

---

## 💡 Usage

### Admin Portal

1. Navigate to `/admin.html`
2. Add companies with role details, CGPA requirements, and package information
3. View all registered companies in a table
4. Delete companies as needed

### Student Portal

1. Navigate to `/student.html`
2. Register with name, branch, skills, and CGPA
3. Check eligibility for specific companies by providing student ID and company ID
4. System automatically validates if student meets CGPA requirements

---

## 📊 Data Models

### Company

```javascript
{
  id: Number,           // Auto-generated
  name: String,         // Company name
  role: String,         // Job role/position
  minCgpa: Number,      // Minimum CGPA requirement (0-10)
  location: String,     // Job location
  package: String,      // Salary package offered
  createdAt: String     // ISO timestamp
}
```

### Student

```javascript
{
  id: Number,           // Auto-generated
  name: String,         // Student name
  branch: String,       // Department/Branch
  skills: Array,        // Array of skills
  cgpa: Number          // Current CGPA (0-10)
}
```

---

## 🔒 Error Handling

The application includes comprehensive error handling:

- Input validation for all API requests
- 404 handling for undefined routes
- Global error middleware for server errors
- Graceful file system error handling

---

## 📝 Notes

- Evaluation scheduled for **March 10, 2026**
- Port configured to `3000` (configurable via `PORT` environment variable)
- Data persists in JSON files in the `/data` directory
- No database setup required - ready to run out of the box

---

## 🤝 Contributing

This is an academic project. For issues or improvements, please coordinate with the team.

---

**Built with ❤️ for streamlined campus placements**
