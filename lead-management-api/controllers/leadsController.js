const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Public
exports.getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find().sort({ updatedAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a lead
// @route   POST /api/leads
// @access  Public
exports.createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }
    next(err);
  }
};