const express = require('express');
const router = express.Router();
const { syncStats, getPlacementStats, getCompanyReport } = require('../controllers/analytics.controller');

// Sync analytics from MongoDB -> Postgres
router.post('/sync-stats', syncStats);

// Get placement stats
router.get('/placement-stats', getPlacementStats);

// Get company report
router.get('/company-report/:companyId', getCompanyReport);

module.exports = router;
