const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY";
/**
 * JWT Authentication Middleware
 * Verifies JWT token and attaches user data to req.user
 */
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No authorization token provided" });
    }

    let token = authHeader;
    if (typeof authHeader === "string" && authHeader.toLowerCase().startsWith("bearer ")) {
      token = authHeader.slice(7).trim();
    }

    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') return res.status(401).json({ success: false, message: 'Token has expired' });
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ success: false, message: 'Invalid token' });
    return res.status(401).json({ success: false, message: 'Authentication failed', error: error.message });
  }
};

module.exports = auth;