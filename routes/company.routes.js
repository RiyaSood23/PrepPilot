// Company routes - API endpoints for company operations
<<<<<<< HEAD


const express = require("express");
=======
const express = require('express');
>>>>>>> 4cf83678f732bf5bee2b41b847b35187daf38c88
const router = express.Router();

const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// GET ALL COMPANIES (logged-in users)
router.get("/", auth, (req, res) => {
  res.send("Get companies (logged in)");
});

// ADD COMPANY (admin only)
router.post("/", auth, role("admin"), (req, res) => {
  res.send("Add company (admin only)");
});

// DELETE COMPANY (admin only)
router.delete("/:id", auth, role("admin"), (req, res) => {
  res.send("Delete company (admin only)");
});

module.exports = router;