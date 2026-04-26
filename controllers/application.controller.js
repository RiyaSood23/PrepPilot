const Application = require("../models/application");
const Student = require("../models/student");
const Company = require("../models/company");

/**
 * Apply for a Job
 * POST /api/students/apply
 * Protected route (requires JWT authentication)
 */
exports.applyJob = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const { jobId } = req.body;

    // Validation
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required"
      });
    }

    // Fetch student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // Fetch company/job
    const company = await Company.findById(jobId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company/Job not found"
      });
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({
      student: studentId,
      job: jobId
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job"
      });
    }

    // Check eligibility: CGPA
    if (student.cgpa < company.minCgpa) {
      return res.status(403).json({
        success: false,
        message: `Your CGPA (${student.cgpa}) is below the minimum required CGPA (${company.minCgpa})`
      });
    }

    // Check eligibility: Skills
    const requiredSkills = company.requiredSkills || [];
    const studentSkillsLower = student.skills.map(s => s.toLowerCase());
    const missingSkills = requiredSkills.filter(
      skill => !studentSkillsLower.includes(skill.toLowerCase())
    );

    if (missingSkills.length > 0) {
      return res.status(403).json({
        success: false,
        message: `Missing required skills: ${missingSkills.join(", ")}`
      });
    }

    // Create application
    const application = await Application.create({
      student: studentId,
      job: jobId,
      status: "applied"
    });

    // Populate references for response
    await application.populate("student", "name email cgpa skills");
    await application.populate("job", "name minCgpa requiredSkills");

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application
    });
  } catch (error) {
    console.error("Apply error:", error);
    next(error);
  }
};

/**
 * Get Student Applications
 * GET /api/students/applications
 * Protected route (requires JWT authentication)
 */
exports.getStudentApplications = async (req, res) => {
  try {
    const studentId = req.user.id;

    const applications = await Application.find({ student: studentId })
      .populate("student", "name email cgpa skills")
      .populate("job", "name minCgpa requiredSkills")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Applications retrieved successfully",
      data: applications
    });
  } catch (error) {
    console.error("Get applications error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching applications",
      error: error.message
    });
  }
};

/**
 * Get Application by ID
 * GET /api/students/applications/:applicationId
 * Protected route (requires JWT authentication)
 */
exports.getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const studentId = req.user.id;

    const application = await Application.findById(applicationId)
      .populate("student", "name email cgpa skills")
      .populate("job", "name minCgpa requiredSkills");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    // Verify that the application belongs to the logged-in student
    if (application.student._id.toString() !== studentId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this application"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application retrieved successfully",
      data: application
    });
  } catch (error) {
    console.error("Get application error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching application",
      error: error.message
    });
  }
};
