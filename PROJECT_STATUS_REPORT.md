# PrepPilot Project Status Report

## Project Overview

PrepPilot is a placement and company tracking system for a college backend project. It is built around an Express server with MongoDB/Mongoose for the core student, company, and application workflows, plus PostgreSQL/Prisma for analytics. The app supports admin and student roles, company management, student authentication, eligibility checks, and application tracking.

The project now includes both API-driven backend features and server-rendered EJS pages, so it is moving from a basic CRUD placement tracker into a fuller backend demo that covers more syllabus topics.

## What Has Been Added So Far

### Core Backend Foundation

- Express server setup in `server.js`
- MongoDB connection through `config/db.js`
- JSON middleware and static file hosting from `public/`
- Centralized routing for auth, students, companies, analytics, and view pages
- Basic 404 and global error handling

### Authentication and Security

- Student registration and login with bcrypt password hashing
- JWT token generation with a 7-day expiry
- Auth and role middleware for protected routes
- Role-based access for student-only actions

### Company Management

- Company CRUD API in `controllers/company.controller.js`
- Add company flow with validation for CGPA, openings, and required data
- Delete company endpoint
- Company download endpoint that exports JSON
- Company listing sorted by newest first
- Support for extra company fields like `description` and `requiredSkills`

### Student and Application Flow

- Student registration and login endpoints
- Eligibility checking based on CGPA and required skills
- Job application flow with duplicate application prevention
- Student application history endpoints
- Application model and logic for tracking submitted jobs

### Analytics and Reporting

- Prisma-based PostgreSQL analytics layer
- `PlacementStats` and `CompanyReport` models in `prisma/schema.prisma`
- Analytics controller for syncing MongoDB data into PostgreSQL
- API endpoints for syncing and reading analytics data
- Company report lookup by company ID

### Server-Rendered Views

- EJS view engine enabled in `server.js`
- Reusable EJS layout in `views/layout.ejs`
- Server-rendered company list page in `views/companies.ejs`
- Route for `/companies-view` in `routes/view.routes.js`

### Frontend Assets

- Static HTML pages for home, login, admin, and student dashboards
- CSS files for the main pages and layouts
- Vanilla JavaScript files for admin and student interactions

## What Is Being Done / Still In Progress

The implementation guide in this repo shows the next planned upgrades for the final evaluation:

- Session and cookie-based login persistence
- Socket.io real-time updates for applications and company counts
- Resume upload with Multer and Cloudinary
- Student profile and resume management UI
- Analytics dashboard frontend
- More complete deployment configuration and documentation
- Final integration of the new backend pieces into the frontend

## Current Project Architecture

- `server.js` is the app entry point and mounts the API and view routes
- `controllers/` contains the business logic for auth, companies, students, applications, and analytics
- `routes/` defines the HTTP endpoints for each feature area
- `models/` contains the MongoDB schemas used by the placement system
- `prisma/` contains the PostgreSQL analytics schema and migration files
- `views/` contains the EJS server-rendered pages
- `public/` contains the client-side HTML, CSS, and JavaScript

## Main Features Available Right Now

- Student registration and login
- Company add, view, delete, and download
- Eligibility checking for companies
- Student application submission and application history
- Analytics sync and analytics read endpoints
- Server-rendered company list page
- Static dashboard pages for admin and student users

## Important Notes

- The core placement workflow is already in place.
- The project is now being expanded to cover the remaining backend syllabus topics.
- The next major work is integration: sessions, Socket.io, resume uploads, and the frontend pages for analytics and profile management.

## Short Summary

PrepPilot is currently a working placement management system with MongoDB-backed student/company/application flows, JWT authentication, and a new analytics layer using PostgreSQL and Prisma. It also includes EJS server rendering for company listings. The remaining work is focused on real-time updates, session persistence, file uploads, analytics UI, and deployment readiness.
