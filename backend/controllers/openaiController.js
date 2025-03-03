import Campaign from '../models/Campaign.js';
import { generateNarrative as openaiGenerateNarrative } from '../utilities/openaiService.js';

export const generateNarrativeHandler = async (req, res, next) => {
  try {
    const { prompt, context } = req.body;
    const messages = [
      { role: 'system', content: 'You are a fantasy RPG game master. Respond in 2-10 sentences.' },
      { role: 'user', content: `${context}\n\n${prompt}` },
    ];
    const narrative = await openaiGenerateNarrative(messages);
    res.json({ narrative });
  } catch (error) {
    next(error);
  }
};

export const continueNarrative = async (req, res, next) => {
  try {
    const {campaignId, userResponse} = req.body;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    campaign.conversationsHistory.push({ role: 'user', content: userResponse });
    if (campaign.conversationsHistory.length ===1){
      campaign.conversationsHistory.unshift({ role: 'system', content: 'You are a fantasy RPG game master. Respond in 2-10 sentences.',
      });
    }



    const narrativeText = await openaiGenerateNarrative(campaign.conversationsHistory);
    campaign.conversationsHistory.push({ role: 'assistant', content: narrativeText });
    await campaign.save();

    res.json({ narrative: narrativeText, conversationsHistory: campaign.conversationsHistory });
  } catch (error) {
    console.error('Continue Narrative Error:', error);
    next(error);
  }
};