const Company = require('../models/company.model');

const parseNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : NaN;
};

// GET /api/companies - Get all companies
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'Companies retrieved successfully',
            data: companies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving companies',
            error: error.message
        });
    }
};

// POST /api/companies - Add a new company
const createCompany = async (req, res) => {
    try {
        const { name, role, minCgpa, location, package: pkg, openings } = req.body;

        // Validate required fields
        if (!name || !role || !minCgpa || !location || !pkg) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: name, role, minCgpa, location, package'
            });
        }

        const parsedMinCgpa = parseNumber(minCgpa);
        const parsedOpenings = openings === undefined || openings === null || openings === '' ? 0 : parseNumber(openings);

        // Validate numeric fields
        if (Number.isNaN(parsedMinCgpa) || parsedMinCgpa < 0 || parsedMinCgpa > 10) {
            return res.status(400).json({
                success: false,
                message: 'minCgpa must be a number between 0 and 10'
            });
        }

        if (Number.isNaN(parsedOpenings) || parsedOpenings < 0) {
            return res.status(400).json({
                success: false,
                message: 'openings must be a number greater than or equal to 0'
            });
        }

        const newCompany = await Company.create({
            name: name.trim(),
            role: role.trim(),
            minCgpa: parsedMinCgpa,
            location: location.trim(),
            package: pkg.trim(),
            openings: parsedOpenings,
            appliedCount: 0
        });

        res.status(201).json({
            success: true,
            message: 'Company added successfully',
            data: newCompany
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating company',
            error: error.message
        });
    }
};

// DELETE /api/companies/:id - Delete a company
const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid company ID'
            });
        }

        const deletedCompany = await Company.findByIdAndDelete(id);

        if (!deletedCompany) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Company deleted successfully',
            data: deletedCompany
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting company',
            error: error.message
        });
    }
};

// GET /api/companies/download - Download companies as JSON file
const downloadCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });

        // Set headers for file download
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename="companies.json"');
        res.status(200).send(JSON.stringify(companies, null, 2));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error downloading companies',
            error: error.message
        });
    }
};

module.exports = {
    getAllCompanies,
    createCompany,
    deleteCompany,
    downloadCompanies
};
