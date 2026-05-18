const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// Import controllers
const {
  registerStudent,
  loginStudent,
  getEligibilityForAllCompanies
} = require("../controllers/student.controller");

const {
  applyJob,
  getStudentApplications,
  getApplicationById
} = require("../controllers/application.controller");

// Public Routes
/**
 * POST /api/students/register
 * Register a new student
 */
router.post("/register", registerStudent);

/**
 * POST /api/students/login
 * Login student and return JWT token
 */
router.post("/login", loginStudent);

// Protected Routes (require authentication)
/**
 * GET /api/students/eligibility
 * Get eligibility of logged-in student for all companies
 */
router.get("/eligibility", auth, role("student"), getEligibilityForAllCompanies);

/**
 * POST /api/students/apply
 * Apply for a job (requires authentication)
 */
router.post("/apply", auth, role("student"), applyJob);

/**
 * GET /api/students/applications
 * Get all applications of logged-in student
 */
router.get("/applications", auth, role("student"), getStudentApplications);

/**
 * GET /api/students/applications/:applicationId
 * Get a specific application by ID
 */
router.get("/applications/:applicationId", auth, role("student"), getApplicationById);

module.exports = router;
