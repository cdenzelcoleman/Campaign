import { generateNarrative } from '../utilities/openaiService.js';

export const getNarrative = async (req, res, next) => {
  try {
    const { campaignId } = req.body;
    const narrativeText = await generateNarrative(campaignId `Campaign ID: ${campaignId}...Your Prompt Here...`);
    res.status(200).json({ narrativeText });
  } catch (error) {
    next(error);
  }
};