import Campaign from '../models/Campaign.js';
import { CHARACTERS } from '../constants/characters.js';

export const createCampaign = async (req, res, next) => {
  try {
    const { title, description, characterId } = req.body;

    const selectedCharacter = CHARACTERS.find((char) => char.id === characterId);
    if (!selectedCharacter) {
      return res.status(400).json({ message: 'Invalid character selection.' });
    }

    const campaign = new Campaign({
      title,
      description,
      character: selectedCharacter.name,
      owner: req.user.userId,
    });

    await campaign.save();

    res.status(201).json({ campaign });
  } catch (error) {
    next(error);
  }
};

export const getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ owner: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json({ campaigns });
  } catch (error) {
    next(error);
  }
};

export const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    if (campaign.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    res.status(200).json({ campaign });
  } catch (error) {
    next(error);
  }
};

export const updateCampaign = async (req, res, next) => {
  try {
    const { title, description, characterId } = req.body;

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }

    if (campaign.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    if (characterId) {
      const selectedCharacter = CHARACTERS.find((char) => char.id === characterId);
      if (!selectedCharacter) {
        return res.status(400).json({ message: 'Invalid character selection.' });
      }
      campaign.character = selectedCharacter.name;
    }

    if (title) campaign.title = title;
    if (description) campaign.description = description;

    await campaign.save();

    res.status(200).json({ campaign });
  } catch (error) {
    next(error);
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

export const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }  

    // Ensure the user owns the campaign
    if (campaign.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied.' });
    }  

    await campaign.remove();

    res.status(200).json({ message: 'Campaign deleted successfully.' });
  } catch (error) {
    next(error);
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