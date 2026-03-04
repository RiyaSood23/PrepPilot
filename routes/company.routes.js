// Company routes - API endpoints for company operations

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
