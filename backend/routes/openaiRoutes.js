import express from 'express';
// import { generateNarrative } from '../controllers/openaiController.js';
import { ensureLoggedIn } from '../middleware/ensureLoggedIn.js';
import { generateNarrativeHandler, continueNarrative } from '../controllers/openaiController.js';


const router = express.Router();

router.post('/generate', ensureLoggedIn, generateNarrativeHandler);
router.post('/continue', ensureLoggedIn, continueNarrative);

export default router;