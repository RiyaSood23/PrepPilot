const fs = require("fs").promises;
const path = require("path");

const studentsFile = path.join(__dirname, "../data/students.json");
const companiesFile = path.join(__dirname, "../data/companies.json");

// Helper to safely read JSON array from file
async function readJsonArray(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    if (!data.trim()) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    // If file doesn't exist or is invalid, start with empty array
    if (err.code === "ENOENT") return [];
    console.error(`Error reading ${filePath}:`, err);
    throw err;
  }
}

// Register Student
exports.registerStudent = async (req, res) => {
  try {
    let { name, branch, skills, cgpa } = req.body;

    if (!name || !branch || !skills || cgpa === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, branch, skills, cgpa) are required"
      });
    }

    // Normalize skills: allow string (comma-separated) or array
    if (typeof skills === "string") {
      skills = skills
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Skills must be a non-empty array or comma-separated string"
      });
    }

    const cgpaNumber = Number(cgpa);
    if (!Number.isFinite(cgpaNumber) || cgpaNumber < 0 || cgpaNumber > 10) {
      return res.status(400).json({
        success: false,
        message: "CGPA must be a valid number between 0 and 10"
      });
    }

    const students = await readJsonArray(studentsFile);

    const studentId = Date.now();

    const newStudent = {
      id: studentId,
      name,
      branch,
      skills,
      cgpa: cgpaNumber
    };

    students.push(newStudent);

    await fs.writeFile(studentsFile, JSON.stringify(students, null, 2), "utf-8");

    res.status(201).json({
      success: true,
      studentId
    });
  } catch (error) {
    console.error("Error in registerStudent:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Check Eligibility
exports.checkEligibility = async (req, res) => {
  try {
    const studentIdParam = Number(req.params.studentId);
    const companyIdParam = Number(req.params.companyId);

    if (!Number.isInteger(studentIdParam) || !Number.isInteger(companyIdParam)) {
      return res.status(400).json({
        success: false,
        message: "studentId and companyId must be valid integers"
      });
    }

    const students = await readJsonArray(studentsFile);
    const companies = await readJsonArray(companiesFile);

    const student = students.find(s => s.id === studentIdParam);
    const company = companies.find(c => c.id === companyIdParam);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    const eligible = Number(student.cgpa) >= Number(company.minCgpa || 0);

    res.json({
      success: true,
      eligible
    });
  } catch (error) {
    console.error("Error in checkEligibility:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
