const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    college: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Other']
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: String,
        required: true,
        trim: true
    },
    contribute: {
        type: String,
        required: true,
        trim: true
    },
    hours: {
        type: String,
        required: true,
        enum: ['2-4 hours', '4-8 hours', '8+ hours']
    },
    linkedin: {
        type: String,
        trim: true,
        default: ''
    },
    portfolio: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);

