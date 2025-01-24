const express = require('express');
const router = express.Router();
const {generateNarative} = require('../controllers/campaignController');
const {protect} = require('../middleware/auth');

// POST /api/campaigns

router.post('/', protect, generateNarative);

module.exports = router;