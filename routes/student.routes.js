const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// REGISTER (public)
router.post("/register", (req, res) => {
  res.send("Student register");
});

// LOGIN (public)
router.post("/login", (req, res) => {
  res.send("Student login");
});

// APPLY (student only)
const { applyCompany } = require("../controllers/student.controller");

router.post("/apply", auth, role("student"), applyCompany);

// PROFILE (logged-in users)
router.get("/profile", auth, (req, res) => {
  res.send("Student profile");
});


module.exports = router;
