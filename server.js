const connectDB = require("./config/db");
connectDB();

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Import Routes
const companyRoutes = require("./routes/company.routes");
const studentRoutes = require("./routes/student.routes");

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Route Mounting
app.use("/api/companies", companyRoutes);
app.use("/api/students", studentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("PrepPilot Server Running");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);