const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const applicationRoutes = require('./routes/applicationRoutes');

// Load environment variables FIRST (before connecting to DB)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/applications', applicationRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'UniHub API is running',
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'UniHub API Server',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            submit: 'POST /api/applications/submit',
            getAll: 'GET /api/applications/all',
            getOne: 'GET /api/applications/:id'
        }
    });
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await connectDB();
        
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
        });

        // Handle server errors (like port already in use)
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Port ${PORT} is already in use!`);
                console.error('\n💡 Solutions:');
                console.error(`1. Kill the process using port ${PORT}:`);
                console.error(`   Windows: netstat -ano | findstr :${PORT}`);
                console.error(`   Then: taskkill /PID <PID> /F`);
                console.error(`   Mac/Linux: lsof -ti:${PORT} | xargs kill -9`);
                console.error(`2. Or change PORT in .env file to a different port (e.g., 5001)`);
                console.error(`3. Or close the other application using port ${PORT}\n`);
            } else {
                console.error('Server error:', error);
            }
            process.exit(1);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

