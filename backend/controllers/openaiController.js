import { generateNarrative } from '../utilities/openaiService.js';
import logger from '../utilities/logger.js'; 

export const getNarrative = async (req, res) => {
  const { prompt, context } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing prompt' });
  }

  try {
    const narrative = await generateNarrative(prompt, context || '');

    logger.info(`Narrative generated for prompt: ${prompt.substring(0, 50)}...`);

    res.json({ narrative });
  } catch (error) {
    logger.error('OpenAI Narrative Generation Error:', error);

    res.status(500).json({ 
      error: 'Failed to generate narrative',
      details: error.message || 'Internal server error',
    });
  }
};