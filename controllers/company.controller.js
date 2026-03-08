// Company controller - Handle business logic for company operations

const fs = require('fs').promises;
const path = require('path');

const COMPANIES_FILE = path.join(__dirname, '../data/companies.json');

// Helper function to read companies from JSON file
const readCompanies = async () => {
    try {
        const data = await fs.readFile(COMPANIES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is empty, return empty array
        return [];
    }
};

// Helper function to write companies to JSON file
const writeCompanies = async (companies) => {
    await fs.writeFile(COMPANIES_FILE, JSON.stringify(companies, null, 2), 'utf8');
};

// Generate unique numeric ID
const generateId = (companies) => {
    if (companies.length === 0) return 1;
    const maxId = Math.max(...companies.map(c => c.id));
    return maxId + 1;
};

// GET /api/companies - Get all companies
const getAllCompanies = async (req, res) => {
    try {
        const companies = await readCompanies();
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
        const { name, role, minCgpa, location, package: pkg } = req.body;

        // Validate required fields
        if (!name || !role || !minCgpa || !location || !pkg) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: name, role, minCgpa, location, package'
            });
        }

        // Validate minCgpa is a number
        if (isNaN(minCgpa) || minCgpa < 0 || minCgpa > 10) {
            return res.status(400).json({
                success: false,
                message: 'minCgpa must be a number between 0 and 10'
            });
        }

        // Read existing companies
        const companies = await readCompanies();

        // Create new company object
        const newCompany = {
            id: generateId(companies),
            name: name.trim(),
            role: role.trim(),
            minCgpa: parseFloat(minCgpa),
            location: location.trim(),
            package: pkg.trim(),
            createdAt: new Date().toISOString()
        };

        // Add to companies array
        companies.push(newCompany);

        // Write to file
        await writeCompanies(companies);

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
        const companyId = parseInt(id);

        // Validate ID
        if (isNaN(companyId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid company ID'
            });
        }

        // Read companies
        const companies = await readCompanies();

        // Find company index
        const companyIndex = companies.findIndex(c => c.id === companyId);

        if (companyIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }

        // Remove company
        const deletedCompany = companies.splice(companyIndex, 1)[0];

        // Write to file
        await writeCompanies(companies);

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
        const fsSync = require('fs');

        // Check if file exists
        if (!fsSync.existsSync(COMPANIES_FILE)) {
            return res.status(404).json({
                success: false,
                message: 'No companies data available'
            });
        }

        // Set headers for file download
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename="companies.json"');

        // Create read stream and pipe to response
        const readStream = fsSync.createReadStream(COMPANIES_FILE);
        readStream.pipe(res);

        readStream.on('error', (error) => {
            res.status(500).json({
                success: false,
                message: 'Error downloading file',
                error: error.message
            });
        });
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
