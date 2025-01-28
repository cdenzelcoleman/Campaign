import express from 'express';
import {
  getCampaigns,
  publishCampaign,
  likeCampaign,
  addComment,
} from '../controllers/campaignController.js';
import { ensureLoggedIn } from '../middleware/ensureLoggedIn.js';

const router = express.Router();

router.get('/', getCampaigns);
router.put('/:id/publish', ensureLoggedIn, publishCampaign);
router.put('/:id/like', ensureLoggedIn, likeCampaign);
router.post('/:id/comments', ensureLoggedIn, addComment);

export default router;