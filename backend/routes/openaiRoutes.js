import express from 'express';
// import { generateNarrative } from '../controllers/openaiController.js';
import { ensureLoggedIn } from '../middleware/ensureLoggedIn.js';
import { generateNarrativeHandler, continueNarrative } from '../controllers/openaiController.js';


const router = express.Router();

router.post('/generate', ensureLoggedIn, async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const narrative = await generateNarrative([
      { role: 'system', content: 'You are a fantasy RPG game master. Respond in 2-10 sentences.' },
      { role: 'user', content: `${context}\n\n${prompt}` },
    ]);
    res.json({ narrative });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
);

router.post('/continue', ensureLoggedIn, continueNarrative);

export default router;