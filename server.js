const connectDB = require("./config/db");
connectDB();

const express = require("express");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db');
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

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

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
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
