const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

const connectDB = require("./config/db");

const companyRoutes = require("./routes/company.routes");
const studentRoutes = require("./routes/student.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const authRoutes = require("./routes/auth.routes");
const viewRoutes = require("./routes/view.routes");


// Middleware
app.use(express.json());
app.use(express.static("public"));


// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);

app.use("/", viewRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("PrepPilot Server Running");
});


// 404
app.use((req, res) => {
  res.status(404).json({
    success:false,
    message:"Route not found"
  });
});


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success:false,
    message:"Internal Server Error",
    error:err.message
  });
});


// Start server + DB
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

startServer();