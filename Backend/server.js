const path = require('path');
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

// Middleware (CORS must be first)
// Middleware (CORS must be first)
app.use(cors({
    origin: ['http://localhost:5173', 'https://naveen-murugan-1.github.io/MyPortfolio/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'auth-token']
}));

app.use(express.json());

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// app.use(mongoSanitize());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000 // Increased for development
});
app.use('/api', limiter);

// MongoDB Connection (Serverless optimized)
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = db.connections[0].readyState === 1;
        // console.log(`Successfully connected to: ${process.env.MONGO_URI.split('@')[1] || 'Local instance'}`);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
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

// Serve Static Files from the frontend build directory
app.use(express.static(path.join(__dirname, '../dist')));

// For any routes that don't match our API, send back the index.html from dist
app.get('/*path', (req, res) => {
    // Check if it's an API route (if so, it shouldn't have matched any route above)
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ message: 'API route not found' });
    }
    const indexPath = path.join(__dirname, '../dist/index.html');
    res.sendFile(indexPath);
});

// Start Server
if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
}

module.exports = app;
