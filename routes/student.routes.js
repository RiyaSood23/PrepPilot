const express = require("express");
const router = express.Router();

const {
  registerStudent,
  checkEligibility
} = require("../controllers/student.controller");

// Base path (in server.js): /api/students

// Register student
// POST /api/students
router.post("/", registerStudent);

// Check eligibility
// GET /api/students/check/:studentId/:companyId
router.get("/check/:studentId/:companyId", checkEligibility);

module.exports = router;
