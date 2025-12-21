const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Application = require('../models/Application');

// Submit application
router.post('/submit', async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            college,
            year,
            role,
            skills,
            contribute,
            // hours,
            linkedin,
            portfolio
        } = req.body;

        // Validate required fields
        if (!fullName || !email || !phone || !college || !year || !role || !skills || !contribute) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Check if email already exists
        const existingApplication = await Application.findOne({ email });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'An application with this email already exists'
            });
        }

        // Create new application
        const application = new Application({
            fullName,
            email,
            phone,
            college,
            year,
            role,
            skills,
            contribute,
            // hours,
            linkedin: linkedin || '',
            portfolio: portfolio || ''
        });

        await application.save();

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully!',
            data: application
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// Get all applications (for admin use)
router.get('/all', async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// Get single application by ID
router.get('/:id', async (req, res) => {
    try {
        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid application ID format'
            });
        }

        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }
        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

module.exports = router;

