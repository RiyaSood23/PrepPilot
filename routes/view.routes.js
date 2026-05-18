const express = require('express');
const router = express.Router();
const Company = require('../models/company.model');

// GET /companies-view - server-rendered list of companies
router.get('/companies-view', async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.render('companies', { companies });
  } catch (err) {
    console.error('Render companies error:', err);
    res.status(500).send('Error rendering companies');
  }
});

module.exports = router;
