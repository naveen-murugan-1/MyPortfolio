const mongoose = require('mongoose');

/**
 * Signal Architect - Project Schema
 * Tailored for ECE/Embedded Systems with detailed technical metrics (specs).
 */
const ProjectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Project title is mandatory'],
        trim: true 
    },
    category: { 
        type: String, 
        enum: ['EMBEDDED_LOGIC', 'RF_SYSTEMS', 'ANALOG_CIRCUITS', 'VLSI_DESIGN', 'SIGNAL_PROCESSING', 'IOT_SYSTEMS'],
        default: 'EMBEDDED_LOGIC' 
    },
    description: { 
        type: String, 
        required: [true, 'Description is required for technical documentation'] 
    },
    techStack: {
        type: [String],
        default: []
    },
    // Technical KPIs for ECE projects
    specs: {
        latency: { type: String, default: 'N/A' },
        power: { type: String, default: 'N/A' },
        frequency: { type: String, default: 'N/A' },
        voltage: { type: String, default: 'N/A' }
    },
    image: { type: String },
    link: { type: String }, // Live demo / External link
    repo: { type: String }, // GitHub/GitLab repository
    date: { type: String }, // Display date (e.g. "Oct 2025")
    startDate: { type: Date }, // For sorting purposes
    isFeatured: { type: Boolean, default: false }
}, { 
    timestamps: true // Track creation and update times
});

// Index for performance
ProjectSchema.index({ category: 1, startDate: -1 });

module.exports = mongoose.model('Project', ProjectSchema);
