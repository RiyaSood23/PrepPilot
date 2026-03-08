const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const companyRoutes = require('./routes/company.routes');

// Middleware
app.use(express.json());
app.use(express.static("public"));

<<<<<<< HEAD
// API Routes
app.use('/api/companies', companyRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Server Running');
=======
// Import Routes
const companyRoutes = require("./routes/company.routes");
const studentRoutes = require("./routes/student.routes");

// Route Mounting
app.use("/api/companies", companyRoutes);
app.use("/api/students", studentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("PrepPilot Server Running");
>>>>>>> 05d1dcfa59be49dbc7dc1a9923b278838cbbda48
});

// 404 Handler
app.use((req, res) => {
<<<<<<< HEAD
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
=======
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
>>>>>>> 05d1dcfa59be49dbc7dc1a9923b278838cbbda48
});

// Global Error Handler
app.use((err, req, res, next) => {
<<<<<<< HEAD
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start server
=======
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

// Start Server
>>>>>>> 05d1dcfa59be49dbc7dc1a9923b278838cbbda48
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});