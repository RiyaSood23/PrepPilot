// Company routes - API endpoints for company operations
<<<<<<< HEAD

const express = require('express');
const router = express.Router();
const {
    getAllCompanies,
    createCompany,
    deleteCompany,
    downloadCompanies
} = require('../controllers/company.controller');

// GET /api/companies - Get all companies
router.get('/', getAllCompanies);

// POST /api/companies - Add a new company
router.post('/', createCompany);

// DELETE /api/companies/:id - Delete a company by ID
router.delete('/:id', deleteCompany);

// GET /api/companies/download - Download companies data as JSON file
router.get('/download', downloadCompanies);

module.exports = router;
=======
// TODO: Implement routes for GET, POST, PUT, DELETE operations
const express = require("express");
const router = express.Router();

// Temporary route (Member 2 will implement logic later)
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Companies route working"
  });
});

module.exports = router;
>>>>>>> 05d1dcfa59be49dbc7dc1a9923b278838cbbda48
