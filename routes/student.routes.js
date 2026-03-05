// Student routes - API endpoints for student operations
// TODO: Implement routes for GET, POST, PUT, DELETE operations
const express = require("express");
const router = express.Router();

// Temporary route (Member 3 will implement logic later)
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Students route working"
  });
});

module.exports = router;