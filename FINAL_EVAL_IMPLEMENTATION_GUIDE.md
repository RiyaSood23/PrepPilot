# PrepPilot Final Evaluation Implementation Guide

This document is the single source of truth for the final backend evaluation.
Use it to understand what each team member achieved in Eval-2, what they own in the final evaluation, and how to upgrade the system using the full backend syllabus.

---

## 1) Current Status (Eval-2 Completion)

PrepPilot is a working placement system that already covers:

### What is working from Eval-2

- ✓ Express.js server setup with proper routing
- ✓ MongoDB connection using Mongoose
- ✓ Student model with bcrypt password hashing
- ✓ Company model with openings and appliedCount tracking
- ✓ Application model with duplicate prevention (unique index)
- ✓ Student registration and login with JWT tokens
- ✓ Company CRUD operations (add, get, delete, download)
- ✓ Eligibility checking based on CGPA
- ✓ Student application system with validation
- ✓ Middleware setup (auth, role, logger)
- ✓ Static frontend with HTML/CSS/JavaScript
- ✓ Admin and student dashboards

One-line summary:
Eval-2 gave us a working system with MongoDB, JWT auth, and real application tracking. The final evaluation is about upgrading it with the remaining syllabus topics while keeping Eval-2 features intact.

---

## 2) Final Evaluation Goal

We are not rebuilding from scratch. We are upgrading the same PrepPilot system to cover the full backend engineering syllabus.

### What the final system should do

PrepPilot helps admins manage companies and students track applications with real-time updates, file upload, analytics, and server-side rendering. The system demonstrates all backend syllabus concepts in a working college-project demo.

### Required Syllabus Topics to Cover

1. ✓ Routing (already done in Eval-2)
2. ✓ Middleware (already done in Eval-2)
3. ✓ MongoDB + Mongoose (already done in Eval-2)
4. ✓ Authentication (JWT + bcrypt, already done in Eval-2)
5. **Sessions + Cookies** (NEW)
6. **EJS Template Engine** (NEW)
7. **Socket.io** (NEW)
8. **PostgreSQL + Prisma** (NEW)
9. **Multer** (NEW)
10. **Cloudinary** (NEW)
11. **Testing** (NEW)
12. **Deployment** (NEW)

---

## 3) Team Ownership and Final Eval Tasks

Each team member continues their Eval-2 role and adds new features on top.

---

## 4) JOY - Backend Core + Security

### Eval-2 Achievements

Joy completed:

- Middleware setup (auth.js, role.js, logger.js)
- JWT authentication and token generation
- Role-based route protection
- Error handling middleware
- Login endpoint with bcrypt password verification
- Protected routes for admin and student actions

### Final Eval Ownership

Joy owns the following final evaluation upgrades:

- Session and cookie management
- Socket.io real-time updates
- Middleware cleanup and improvements
- Better error handling
- Deployment setup and environment configuration
- Security hardening

### Specific Tasks for Joy

1. **Setup Express Session + Cookie Parser**
   - Install `express-session` and `cookie-parser`
   - Configure session storage with MongoDB store (connect-mongo)
   - Setup cookie handling with secure flags for production
   - Add session middleware to server.js before routes
   - Sessions should persist for 7 days

2. **Implement Socket.io Real-Time Updates**
   - Install `socket.io`
   - Initialize Socket.io with Express server
   - Emit `applicationSubmitted` event when student applies
   - Emit `companyCountUpdated` when appliedCount changes
   - Create Socket.io namespace if needed
   - Admin dashboard listens for these events in frontend

3. **Clean Up Middleware**
   - Review existing auth.js and improve error messages
   - Add error codes to responses (e.g., 401 for unauthorized)
   - Create centralized error handling utility
   - Add request ID tracking for debugging

4. **Deployment Ready Setup**
   - Document all required environment variables
   - Setup production vs development configs
   - Add deployment checklist to README
   - Test on local deployment simulation

### Definition of Done for Joy

Joy's work is complete when:

- Sessions persist across page refreshes
- Users stay logged in for 7 days
- Cookies are set with secure flags in production
- Socket.io connects successfully and emits/receives events
- Admin dashboard receives real-time application updates without refresh
- All error responses have consistent format and codes
- Environment variables are documented in .env.example

---

## 5) RIYA - Database + Company System

### Eval-2 Achievements

Riya completed:

- MongoDB connection setup with Mongoose
- Company model creation with proper validations
- Company CRUD endpoints (GET, POST, DELETE)
- Company download as JSON feature
- Migration of company logic from JSON to MongoDB
- AppliedCount and openings field tracking

### Final Eval Ownership

Riya owns the following final evaluation upgrades:

- PostgreSQL setup and Prisma integration
- Analytics and reporting system
- EJS template engine implementation
- Company model enhancements
- Analytics dashboard API

### Specific Tasks for Riya

1. **Setup PostgreSQL + Prisma** done
   - Install PostgreSQL locally (or use managed service like Railway, Neon)
   - Create a new database named `preppilot_analytics`
   - Install Prisma CLI and client
   - Create `prisma/schema.prisma` with analytics models
   - Run `prisma migrate dev --name init` to create tables
   - Generate Prisma client

2. **Create Analytics Models in PostgreSQL** done
   - PlacementStats: companyName (String), totalApplied (Int), totalSelected (Int), averageCgpa (Float), reportDate (DateTime)
   - CompanyReport: companyId (String), totalApplications (Int), selectedCount (Int), rejectedCount (Int), createdAt (DateTime)
   - Add indexes on companyName and reportDate for query performance

3. **Implement Analytics Endpoints** done
   - `POST /api/analytics/sync-stats` - sync placement data from MongoDB to PostgreSQL
   - `GET /api/analytics/placement-stats` - get all placement statistics
   - `GET /api/analytics/company-report/:companyId` - detailed report for one company

4. **Convert Company Listing to EJS** done
   - Setup EJS as view engine in server.js (`app.set('view engine', 'ejs')`)
   - Create `views/` folder
   - Create `views/layout.ejs` with header/footer reusable HTML
   - Create `views/companies.ejs` to render company list from backend
   - Route: `GET /companies-view` renders the EJS page with all companies from MongoDB
   - Add CSS styling to match existing site

5. **Improve Company Model** done
   - Add optional `requiredSkills` array to Company model
   - Add optional `description` field for company details
   - Update company controller to handle new fields in POST/PUT requests

### Definition of Done for Riya

Riya's work is complete when:

- PostgreSQL is connected and migrations run successfully
- Prisma models are defined and database tables created
- Analytics data syncs from MongoDB to PostgreSQL via POST /api/analytics/sync-stats
- GET /api/analytics/placement-stats returns correct aggregated data
- EJS company listing page renders with live company data
- Company list page shows all companies in a formatted HTML table
- Page styling matches existing site design

---

## 6) MEGHNA - Student + Application System

### Eval-2 Achievements

Meghna completed:

- Student model with bcrypt password hashing
- Student registration endpoint with validation
- Student login endpoint with JWT token
- Application model with unique student+company index
- Apply endpoint with eligibility checks
- Duplicate application prevention
- Get student applications endpoint
- CGPA eligibility enforcement

### Final Eval Ownership

Meghna owns the following final evaluation upgrades:

- Resume upload system with Multer and Cloudinary
- Student profile enhancements
- Application status tracking
- Resume storage integration

### Specific Tasks for Meghna

1. **Setup Multer for File Upload**
   - Install multer
   - Create `middlewares/upload.js` with Multer configuration
   - Configure file size limits (max 5MB)
   - Whitelist only PDF, DOC, DOCX files
   - Store temporarily in `uploads/` folder
   - Return error if file type is not allowed

2. **Setup Cloudinary for Cloud Storage**
   - Create free Cloudinary account
   - Install cloudinary npm package
   - Create `config/cloudinary.js` to initialize Cloudinary
   - Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env
   - Test Cloudinary connection on server start

3. **Implement Resume Upload Endpoint**
   - `POST /api/students/upload-resume` (protected route, requires JWT)
   - Accept file in multipart/form-data with key "resume"
   - Validate file type (only PDF, DOC, DOCX)
   - Validate file size (max 5MB)
   - Upload to Cloudinary
   - Save returned Cloudinary URL in Student model
   - Return success response with resume URL

4. **Add resumeUrl to Student Model**
   - Add `resumeUrl: String` field to studentSchema
   - Add `resumeUploadedAt: Date` field for tracking
   - Update Student registration to accept resumeUrl (optional)

5. **Create Resume Management Endpoints**
   - `GET /api/students/:studentId/resume` - get student's resume URL (public endpoint)
   - `DELETE /api/students/:studentId/resume` - delete resume (protected, student only)
   - Allow resume replacement (new upload overwrites old one)

### Definition of Done for Meghna

Meghna's work is complete when:

- Students can upload PDF/DOC/DOCX files
- Files larger than 5MB are rejected
- Files with wrong format are rejected
- Cloudinary receives and stores files successfully
- Resume URL is saved in MongoDB Student model
- Students can view their resume URL
- Resume persists across sessions
- Duplicate resume uploads replace the old one
- Resume can be deleted

---

## 7) JIA - Frontend Integration

### Eval-2 Achievements

Jia completed:

- Frontend HTML pages (index.html, login.html, admin.html, student.html)
- CSS styling with responsive design
- Vanilla JavaScript for form handling
- Fetch API integration with backend
- Login state management with localStorage
- Company listing and filtering
- Admin dashboard with add/delete company
- Student dashboard with eligibility check

### Final Eval Ownership

Jia owns the following final evaluation upgrades:

- Frontend updates for all new backend features
- Socket.io event listeners for real-time updates
- Resume upload UI
- Analytics dashboard
- Session-based UI state management
- Deployment coordination

### Specific Tasks for Jia

1. **Update Login/Register Forms**
   - Add resume file upload field to student registration form
   - Handle file selection with HTML file input
   - Show file name and size validation messages
   - Integrate with Multer + Cloudinary POST /api/students/upload-resume endpoint
   - Show upload progress or spinner

2. **Add Real-Time Updates with Socket.io**
   - Import Socket.io client in public/js/
   - Initialize Socket.io connection to server
   - Listen for 'applicationSubmitted' event
   - Listen for 'companyCountUpdated' event
   - Update admin dashboard company application counts in real-time without page refresh
   - Show toast notification when new application arrives

3. **Create Analytics Dashboard Page**
   - Create public/analytics.html
   - Fetch data from GET /api/analytics/placement-stats
   - Display:
     - Total applications by company
     - Average CGPA by company
     - Placement success rate
     - Use tables or charts for visualization
   - Add link to this page in navigation

4. **Integrate EJS Rendered Pages**
   - Add link to GET /companies-view in navigation menu
   - Display server-rendered company list page
   - Ensure CSS styling matches existing site

5. **Add Student Profile with Resume**
   - Create public/profile.html
   - Show student details: name, email, CGPA, skills
   - Show resume upload status and button
   - Display resume download link if exists
   - Allow resume replacement (upload again)
   - Add to navigation menu

6. **Improve Session Management**
   - Use session cookies instead of just localStorage
   - Validate session on page load (fetch /api/auth/me)
   - Redirect to login if session expired
   - Show session status in UI (display username)

7. **Prepare for Deployment**
   - Update all API URLs to use environment variables
   - Setup separate development/production configs
   - Test all features in production simulation

### Definition of Done for Jia

Jia's work is complete when:

- Resume upload works end-to-end (form → file select → upload → save URL)
- Admin dashboard shows real-time application count updates via Socket.io
- Analytics dashboard displays placement statistics
- Student can view and manage their resume
- EJS company listing page is styled and matches site design
- Login persists across page refreshes
- All forms validate input and show error messages
- Deployment scripts and configs are ready

---

## 8) Implementation Order (For All Members)

Do this in sequence to avoid conflicts:

1. **Joy starts first** - Setup sessions, Socket.io, middleware
2. **Riya starts in parallel** - Setup PostgreSQL, Prisma, EJS
3. **Meghna starts in parallel** - Setup Multer, Cloudinary, resume upload
4. **Jia integrates last** - After Joy, Riya, Meghna have APIs ready

---

## 9) What Each Team Member Should Do Next

### For Joy

1. Copy the prompt from section 4
2. Paste it into your AI tool
3. Ask the AI to implement sessions, Socket.io, and middleware improvements
4. Test that sessions persist and Socket.io emits events

### For Riya

1. Copy the prompt from section 5
2. Paste it into your AI tool
3. Ask the AI to setup PostgreSQL, Prisma, and EJS
4. Test that analytics data syncs and EJS pages render

### For Meghna

1. Copy the prompt from section 6
2. Paste it into your AI tool
3. Ask the AI to implement Multer, Cloudinary, resume upload
4. Test that files upload successfully to Cloudinary

### For Jia

1. Wait for Joy, Riya, Meghna to finish their APIs
2. Copy the prompt from section 7
3. Paste it into your AI tool
4. Ask the AI to integrate frontend with new backend endpoints
5. Test end-to-end flows

---

## 10) Definition of Done (Final Evaluation)

The project is ready for demo when ALL of these are true:

### Core Features Still Work

- ✓ Student can register and login
- ✓ Admin can add/delete companies
- ✓ Student can view companies and check eligibility
- ✓ Student can apply to eligible companies
- ✓ Duplicate applications are blocked

### New Features Working

- ✓ Student can upload resume to Cloudinary
- ✓ Resume URL is saved in MongoDB
- ✓ Admin dashboard shows real-time application count updates
- ✓ Company listing page renders with EJS from server
- ✓ Analytics dashboard shows placement statistics
- ✓ Sessions keep users logged in across page refreshes
- ✓ Socket.io emits events when applications arrive

### Syllabus Coverage

- ✓ Routing (Express routes)
- ✓ Middleware (auth, session, error handling)
- ✓ MongoDB + Mongoose (student, company, application models)
- ✓ Authentication (JWT + bcrypt)
- ✓ Sessions + Cookies (express-session)
- ✓ EJS Template Engine (company listing page)
- ✓ Socket.io (real-time updates)
- ✓ PostgreSQL + Prisma (analytics tables)
- ✓ Multer (file upload)
- ✓ Cloudinary (cloud storage)
- ✓ Testing (Postman collection or API tests)
- ✓ Deployment (environment variables, deployment checklist)

---

## 11) Testing Checklist Before Final Demo

Test these flows end-to-end:

- [ ] Register student with resume upload
- [ ] Login student (verify session persists on refresh)
- [ ] View companies list (both HTML and EJS version)
- [ ] Check eligibility for companies
- [ ] Apply to eligible company
- [ ] Try apply to ineligible company (should fail)
- [ ] Try duplicate apply (should fail)
- [ ] View submitted applications
- [ ] Upload/replace resume
- [ ] View resume URL
- [ ] Admin adds company
- [ ] See real-time count update in admin dashboard (Socket.io)
- [ ] View analytics dashboard
- [ ] Download companies as JSON

---

## 12) Git Commit Message Template

When pushing to main:

```
feat: Final evaluation upgrade with sessions, Socket.io, EJS, Multer, Cloudinary, PostgreSQL, and analytics

- Joy: Added session management, Socket.io real-time updates, middleware improvements
- Riya: Setup PostgreSQL, Prisma analytics, EJS template for company listing
- Meghna: Implemented Multer, Cloudinary resume upload, resume management
- Jia: Integrated frontend with new backend features, real-time updates, analytics dashboard

All Eval-2 features remain intact. Full syllabus coverage achieved.
```

---

## 13) Team Sync Meeting Agenda

Use this when discussing as a team:

1. **Status Check** - Each member: What did you complete? What's blocked?
2. **Demo** - Show what works end-to-end
3. **Issues** - Discuss any errors or integration problems
4. **Next Steps** - What's left? Who needs help?
5. **Final Polish** - UI, error messages, edge cases

---

## Final Message

> "Eval-2 gave us a working placement system with MongoDB and JWT auth. The final evaluation upgrades it to show the full backend syllabus: sessions, real-time Socket.io, EJS rendering, file upload with Cloudinary, PostgreSQL analytics, and deployment readiness. Each team member owns specific features and can use the provided AI prompt to implement their part."

Built for the PrepPilot final evaluation team.
