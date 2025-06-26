const express = require('express');
const {
  getLeads,
  createLead
} = require('../controllers/leadsController');

const router = express.Router();

router.route('/')
  .get(getLeads)
  .post(createLead);

module.exports = router;