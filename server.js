const express = require('express');
const app = express();
const PORT = 5000;

// Import routes
const companyRoutes = require('./routes/company.routes');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.use('/api/companies', companyRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Server Running');
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
