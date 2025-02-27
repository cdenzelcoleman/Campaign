import Campaign from '../models/Campaign.js';
import { generateNarrative as openaiGenerateNarrative } from '../utilities/openaiService.js';

export const generateNarrativeHandler = async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const messages = [
      { role: 'system', content
      : 'You are a fantasy RPG game master. Respond in 2-10 sentences.' },
      { role: 'user', content: `${context}\n\n${prompt}` },
    ];
    const narrative = await openaiGenerateNarrative(message);
    res.json({ narrative });
  } catch (error) {
    next(error);
  }
};
 
export const continueNarrative = async (req, res, next) => {
  try {
    const {campaignId, userReponse} = req.body;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    campaign.conversationHistory.push({ role: 'user', content: userReponse });
    if (campaign.conversationHistory.length ===1){
      campaign.conversationHistory.unshift({ role: 'system', content: 'You are a fantasy RPG game master. Respond in 2-10 sentences.',
      });
    }

    const narrativeText= await generateNarrative(campaign.conversationHistory);
    campaign.conversationHistory.push({ role: 'assistant', content: narrativeText });
    await campaign.save();

    res.json({ narrative: narrativeText, conversationHistory: campaign.conversationHistory });
  } catch (error) {
    console.error('Continue Narrative Error:', error);
    next(error);
  }
};