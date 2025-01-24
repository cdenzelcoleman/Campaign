const express = require('express');
const router = express.Router();
const { generateNarative } = require('../controllers/campaignController');
const checkToken = require('../middleware/checkToken');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// POST /api/campaigns

router.post('/generate-narrative', checkToken, ensureLoggedIn, generateNarative);

module.exports = router;