import Campaign from '../models/Campaign.js';
import { CHARACTERS } from '../constants/characters.js';

export const createCampaign = async (req, res) => {
  try {
    const { title, description, character } = req.body;
    const selectedCharacter = CHARACTERS.find((char) => char.id === characterId);
    if (!selectedCharacter) {
      return res.status(400).json({ error: 'Invalid character' });
    }

    const campaign = new Campaign({
      title,
      description,
      character: selectedCharacter.name,
      content: selectedCharacter.content,
      owner: req.user.user._id,
    });

    await campaign.save();

    res.status(201).json({campaign});
  } catch (error) {
    next(error);
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate('user', 'username email') 
      .populate('likes', 'username email') 
      .populate('comments.user', 'username email'); 

    res.json(campaigns);
  } catch (error) {
    console.error('Get Campaigns Error:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};

export const publishCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (campaign.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to publish this campaign' });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { 
        isPublished: true,
        publishedDate: Date.now(),
      },
      { new: true }
    );

    res.json(updatedCampaign);
  } catch (error) {
    console.error('Publish Campaign Error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const likeCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    const userId = req.user._id;

    if (campaign.likes.includes(userId)) {
      campaign.likes.pull(userId);
    } else {
      campaign.likes.push(userId);
    }

    await campaign.save();

    const populatedCampaign = await Campaign.findById(campaign._id)
      .populate('likes', 'username email');

    res.json(populatedCampaign);
  } catch (error) {
    console.error('Like Campaign Error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;

    if (!text || !id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    campaign.comments.push({
      user: req.user._id,
      text,
    });

    await campaign.save();

    const populatedCampaign = await Campaign.findById(campaign._id)
      .populate('comments.user', 'username email');

    res.json(populatedCampaign.comments);
  } catch (error) {
    console.error('Add Comment Error:', error);
    res.status(400).json({ error: error.message });
  }
};