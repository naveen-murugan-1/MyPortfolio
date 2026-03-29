const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------
// CORS
// --------------------
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://naveen-murugan-1.github.io',
    'https://your-frontend.vercel.app' // replace this with your real frontend URL if needed
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (Postman, mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error(`CORS Error: Origin ${origin} not allowed`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'auth-token']
}));

// --------------------
// Core Middleware
// --------------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// --------------------
// Security Middleware
// --------------------
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(mongoSanitize());

// --------------------
// Rate Limiting
// --------------------
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false
});

app.use('/api', limiter);

// --------------------
// MongoDB Connection (Serverless Optimized)
// --------------------
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
    }
};

// Connect DB before every request (safe for serverless)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// --------------------
// Health Check Routes
// --------------------
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend is running 🚀'
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        database: isConnected ? 'connected' : 'disconnected',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// --------------------
// API Routes
// --------------------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/about', require('./routes/about'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/education', require('./routes/education'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/leetcode', require('./routes/leetcode'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/sociallinks', require('./routes/socialLinks'));
app.use('/api/chat', require('./routes/chat'));

// --------------------
// API 404 Handler
// --------------------
app.use('/api', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API route not found'
    });
});

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);

    // Handle CORS errors nicely
    if (err.message && err.message.startsWith('CORS Error')) {
        return res.status(403).json({
            success: false,
            message: err.message
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

// --------------------
// Start Server (Local Only)
// --------------------
if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
}

module.exports = app;
