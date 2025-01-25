const express = require('express');
const router = express.Router();
const openaiController = require('../controllers/openaiController');
const checkToken = require('../middleware/checkToken');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.use(checkToken);
router.post('/generate', ensureLoggedIn, openaiController.generateNarative)

module.exports = router;