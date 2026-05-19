const User = require("../models/user");
const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  res.json({
    message: "User registered successfully",
    user
  });
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY || "SECRET_KEY",
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    data: { user, token }
  });
};

const me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No authorization token provided" });
    }

    const token = authHeader.toLowerCase().startsWith("bearer ")
      ? authHeader.slice(7).trim()
      : authHeader;

    const decoded = jwt.verify(token, process.env.SECRET_KEY || "SECRET_KEY");
    const user = await User.findById(decoded.id);
    const student = user ? null : await Student.findById(decoded.id);
    const activeRecord = user || student;

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: decoded.id,
          email: activeRecord?.email || decoded.email,
          role: activeRecord?.role || decoded.role,
          name: activeRecord?.name || decoded.name || decoded.email || decoded.role
        }
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message
    });
  }
};

module.exports = { register, login, me };