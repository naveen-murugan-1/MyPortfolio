const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const verifyToken = require('../middleware/auth');
const mongoose = require('mongoose');

// Utility to parse "Oct 2025" style dates if manually passed
const parseDate = (dateStr) => {
    if (!dateStr) return new Date();
    try {
        const d = new Date(dateStr);
        return isNaN(d) ? new Date() : d;
    } catch {
        return new Date();
    }
};

/**
 * @route   GET /api/projects
 * @desc    Fetch all projects sorted by start date (descending)
 */
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ startDate: -1 });
        console.log(`[GET] Projects Pulled: ${projects.length}`);
        res.status(200).json(projects);
    } catch (err) {
        console.error('[GET] Project Pull Error:', err.message);
        res.status(500).json({ status: 'fail', message: 'Internal logic error during data aggregation' });
    }
});

/**
 * @route   POST /api/projects
 * @desc    Securely register a new Project profile (Admin only)
 */
router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, fromDate, date, category, techStack, specs, description, image, link, repo } = req.body;
        
        const project = new Project({
            title,
            category,
            techStack,
            specs,
            description,
            image,
            link,
            repo,
            date: date || fromDate,
            startDate: parseDate(fromDate || date)
        });

        const saved = await project.save();
        res.status(201).json({ status: 'success', data: saved });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

/**
 * @route   PUT /api/projects/:id
 * @desc    Update an existing Project's detailed telemetry/metadata
 */
router.put('/:id', verifyToken, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Project Identifier' });
        }

        const updateData = { ...req.body };
        if (updateData.fromDate || updateData.date) {
            updateData.startDate = parseDate(updateData.fromDate || updateData.date);
        }

        const updated = await Project.findByIdAndUpdate(
            req.params.id, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        );

        res.json({ status: 'success', data: updated });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

/**
 * @route   DELETE /api/projects/:id
 * @desc    Wipe a Project record from the core logic pool
 */
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ status: 'success', message: 'Node deleted from systems grid' });
    } catch (err) {
        res.status(500).json({ status: 'fail', message: err.message });
    }
});

module.exports = router;
