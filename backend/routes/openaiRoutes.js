import express from 'express';
import { generateNarrative } from '../utilities/openaiService.js';
import { ensureLoggedIn } from '../middleware/ensureLoggedIn.js';


const router = express.Router();

router.post('/generate', ensureLoggedIn, async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const narrative = await generateNarrative(prompt, context);
    res.json({ narrative });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;