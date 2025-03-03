import express from 'express';
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  publishCampaign,
  deleteCampaign,
  likeCampaign,
  deleteAllCampaign,
  addComment, getComments
} from '../controllers/campaignController.js';


import { ensureLoggedIn } from '../middleware/ensureLoggedIn.js';

const router = express.Router();

router.delete('/all', deleteAllCampaign);
router.post('/', ensureLoggedIn, createCampaign);
router.get('/:id', ensureLoggedIn, getCampaignById);
router.put('/:id', updateCampaign);
router.get('/', getCampaigns);
router.put('/:id/publish', ensureLoggedIn, publishCampaign);
router.delete('/:id', ensureLoggedIn, deleteCampaign);
router.put('/:id/like', ensureLoggedIn, likeCampaign);
router.post('/:id/comments', ensureLoggedIn, addComment);
router.get('/:id/comments', getComments);


export default router;