const express = require('express');
const router = express.Router();
const { generateNarative } = require('../controllers/campaignController');
const checkToken = require('../middleware/checkToken');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const campaignController = require('../controllers/campaignController');


//Middleware

router.use(checkToken);

router.put('/publish/:id', ensureLoggedIn, publishCampaign, campaignController);


router.post('/:id/like', ensureLoggedIn, campaignController.likeCampaign);


router.post('/:id/comment', ensureLoggedIn, campaignController.commentCampaign);



// POST /api/campaigns

router.post('/generate-narrative', checkToken, ensureLoggedIn, generateNarative);

module.exports = router;