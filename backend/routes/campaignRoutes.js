import express from 'express';
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  publishCampaign,
  deleteCampaign,
  likeCampaign,
  addComment,
} from '../controllers/campaignController.js';
import { ensureLoggedIn } from '../middleware/ensureLoggedIn.js';

const router = express.Router();

router.post('/', ensureLoggedIn, createCampaign);
router.get('/:id', ensureLoggedIn, getCampaignById);
router.put('/:id', ensureLoggedIn, updateCampaign);
router.get('/', getCampaigns);
router.put('/:id/publish', ensureLoggedIn, publishCampaign);
router.delete('/:id', ensureLoggedIn, deleteCampaign);
router.put('/:id/like', ensureLoggedIn, likeCampaign);
router.post('/:id/comments', ensureLoggedIn, addComment);

export default router;