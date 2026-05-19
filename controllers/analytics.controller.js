const prisma = require('../config/prismaClient');
const Company = require('../models/company.model');
const Application = require('../models/application');

// POST /api/analytics/sync-stats
exports.syncStats = async (req, res) => {
  try {
    const companies = await Company.find();
    const results = [];

    for (const company of companies) {
      const totalApplications = await Application.countDocuments({ job: company._id });
      const selectedCount = await Application.countDocuments({ job: company._id, status: 'accepted' });

      const apps = await Application.find({ job: company._id }).populate('student', 'cgpa');
      let averageCgpa = null;
      if (apps.length > 0) {
        const sum = apps.reduce((acc, a) => acc + (a.student && a.student.cgpa ? a.student.cgpa : 0), 0);
        averageCgpa = sum / apps.length;
      }

      // Create a PlacementStats record
      const ps = await prisma.placementStats.create({
        data: {
          companyName: company.name,
          totalApplied: totalApplications,
          totalSelected: selectedCount,
          averageCgpa: averageCgpa
        }
      });

      // Create a CompanyReport record
      const cr = await prisma.companyReport.create({
        data: {
          companyId: company._id.toString(),
          totalApplications: totalApplications,
          selectedCount: selectedCount,
          rejectedCount: await Application.countDocuments({ job: company._id, status: 'rejected' })
        }
      });

      results.push({ company: company.name, placementStatsId: ps.id, companyReportId: cr.id });
    }

    return res.status(200).json({ success: true, message: 'Analytics synced', data: results });
  } catch (error) {
    console.error('syncStats error:', error);
    return res.status(500).json({ success: false, message: 'Error syncing analytics', error: error.message });
  }
};

// GET /api/analytics/placement-stats
exports.getPlacementStats = async (req, res) => {
  try {
    const stats = await prisma.placementStats.findMany({ orderBy: { reportDate: 'desc' } });
    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error('getPlacementStats error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching placement stats', error: error.message });
  }
};

// GET /api/analytics/company-report/:companyId
exports.getCompanyReport = async (req, res) => {
  try {
    const { companyId } = req.params;
    const reports = await prisma.companyReport.findMany({ where: { companyId }, orderBy: { reportDate: 'desc' } });
    return res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error('getCompanyReport error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching company report', error: error.message });
  }
};
