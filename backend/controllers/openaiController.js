import Campaign from '../models/Campaign.js';
import { generateNarrative as openaiGenerateNarrative } from '../utilities/openaiService.js';

export const generateNarrativeHandler = async (req, res, next) => {
  try {
    const { campaignId, prompt } = req.body;
    const campaign = await Campaign.findById(campaignId).populate('character');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }

    const context = `Campaign Title: ${campaign.title}\n
    Campaign Description: ${campaign.description}\n
    Character Name: ${campaign.character.name}\n
    Character Description: ${campaign.character.description}\n
    Character Role: ${campaign.character.role}`;
    const messages = [
      {
        role: 'system',
        content: `You are a creative and interactive fantasy RPG game master. 
        When given a prompt, craft an immersive narrative that establishes a rich,
         canonical backstory in up to 60 sentences. As you approach the end of the narrative,
          use the final 10 sentences to build tension and leave the story at a dramatic cliffhanger, 
          inviting the player to decide the next course of action. 
          The narrative should subtly imply that the player has several
           types of decisions to make—whether to take action, engage in dialogue, 
           observe details, or introduce a new element—without explicitly 
           listing out these options. Ensure that the story flows naturally and
            that the cliffhanger clearly marks a turning point for the player’s
             creative input.`,},   
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

    const campaign = await Campaign.findById(campaignId).populate('character');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }

    if (campaign.conversationsHistory.length === 0){
      campaign.conversationsHistory.push({ 
        role: 'system',
         content: `Campaign Title: ${campaign.title}\n
         Campaign Description: ${campaign.description}\n
         Character Name: ${campaign.character.name}\n
         Character Description: ${campaign.character.description}\n
         Character Role: ${campaign.character.role}\n\n
        You are a creative and interactive 
        fantasy RPG game master. When given a prompt, craft a captivating and immersive narrative that directly addresses the player as "you."
         Although the campaign includes detailed character information, 
        always refer to the character using second-person pronouns ("you")
         instead of using their name or third-person references. 
         Ensure that the narrative integrates the campaign and character context seamlessly. 
        The captivating and immersive narrative should span between 2 and 18 sentences. 
        Establish a vivid scene or develop 
        the backstory, and conclude with a suspenseful cliffhanger (and complete sentence) that invites the 
        player to decide what to do next without explicitly listing their options. 
        Ensure the narrative flows naturally and leaves ample room for creative 
        continuation.`,
      });
      }
    campaign.conversationsHistory.push({ role: 'user', content: userResponse });
    
    const narrativeText = await openaiGenerateNarrative(campaign.conversationsHistory);
    campaign.conversationsHistory.push({ role: 'assistant', content: narrativeText });
    await campaign.save();

    res.json({ narrative: narrativeText, conversationsHistory: campaign.conversationsHistory });
  } catch (error) {
    console.error('Continue Narrative Error:', error);
    next(error);
  }
};