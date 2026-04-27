const Student = require("../models/student");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Register Student
 * POST /api/students/register
 * Public route
 */
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, cgpa, skills } = req.body;

    // Validation
    if (!name || !email || !password || cgpa === undefined || !skills) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password, cgpa, skills) are required"
      });
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Skills must be a non-empty array"
      });
    }

    if (cgpa < 0 || cgpa > 10) {
      return res.status(400).json({
        success: false,
        message: "CGPA must be between 0 and 10"
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Create new student
    const student = await Student.create({
      name,
      email,
      password,
      cgpa,
      skills
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email, role: student.role },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: {
        student: student.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Error registering student",
      error: error.message
    });
  }
};

/**
 * Login Student
 * POST /api/students/login
 * Public route
 */
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find student and include password field
    const student = await Student.findOne({ email }).select("+password");

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isPasswordValid = await student.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email, role: student.role },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        student: student.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message
    });
  }
};

/**
 * Get Eligibility for All Companies
 * GET /api/students/eligibility
 * Protected route (requires JWT)
 */
exports.getEligibilityForAllCompanies = async (req, res) => {
  try {
    // Get logged-in student ID from JWT
    const studentId = req.user.id;

    // Fetch student details
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // Fetch all companies
    // Assuming Company model exists with minCgpa and requiredSkills fields
    const Company = require("../models/company");
    const companies = await Company.find();

    if (!companies || companies.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No companies available",
        data: {
          student: {
            id: student._id,
            name: student.name,
            email: student.email,
            cgpa: student.cgpa,
            skills: student.skills
          },
          eligibility: []
        }
      });
    }

    // Calculate eligibility for each company
    const eligibility = companies.map((company) => {
      // Check CGPA eligibility
      const isCgpaEligible = student.cgpa >= company.minCgpa;

      // Check skills eligibility
      const requiredSkills = company.requiredSkills || [];
      const hasRequiredSkills = requiredSkills.every((skill) =>
        student.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      );

      return {
        companyId: company._id,
        companyName: company.name,
        minCgpa: company.minCgpa,
        requiredSkills: company.requiredSkills,
        isEligible: isCgpaEligible && hasRequiredSkills,
        reason: {
          cgpaEligible: isCgpaEligible,
          skillsEligible: hasRequiredSkills
        }
      };
    });

    return res.status(200).json({
      success: true,
      message: "Eligibility calculated successfully",
      data: {
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
          cgpa: student.cgpa,
          skills: student.skills
        },
        eligibility
      }
    });
  } catch (error) {
    console.error("Eligibility error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching eligibility",
      error: error.message
    });
  }
};
