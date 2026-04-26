const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY";

/**
 * JWT Authentication Middleware
 * Verifies JWT token and attaches user data to req.user
 */
const auth = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No authorization token provided"
      });
    }

    // Extract token (format: "Bearer <token>")
    let token = authHeader;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Attach user data to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired"
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message
    });
  }
};

module.exports = auth;