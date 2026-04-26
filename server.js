const express = require("express");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db');
const companyRoutes = require("./routes/company.routes");
const studentRoutes = require("./routes/student.routes");

// Middleware
app.use(express.json());

// Serve all files from public folder
app.use(express.static(__dirname + "/public"));

// Root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// API Routes
app.use("/api/companies", companyRoutes);
app.use("/api/students", studentRoutes);

// 404 Handler
app.use((req, res) => {
  console.log("404 for route:", req.url);   // Debugging ke liye
  res.status(404).json({ 
    success: false, 
    message: "Route not found",
    url: req.url 
  });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
    console.log(` Login Page → http://localhost:${PORT}/login.html`);
  });
};

startServer();