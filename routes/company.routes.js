// Company routes - API endpoints for company operations

const express = require("express");
const router = express.Router();

const {
  getAllCompanies,
  createCompany,
  deleteCompany,
  downloadCompanies
} = require("../controllers/company.controller");

const auth = require("../middlewares/auth");
const role = require("../middlewares/role");


// GET all companies → logged-in users
router.get("/", auth, getAllCompanies);


// ADD company → admin only
router.post(
  "/",
  auth,
  role("admin"),
  createCompany
);


// DELETE company → admin only
router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteCompany
);


// DOWNLOAD company data → admin only
router.get(
  "/download",
  auth,
  role("admin"),
  downloadCompanies
);

module.exports = router;