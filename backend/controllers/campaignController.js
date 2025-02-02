import Campaign from '../models/Campaign.js';
import { CHARACTERS } from '../constants/characters.js';

export const createCampaign = async (req, res, next) => {
  console.log(req.body);
  console.log(req.user);
  try {
    const { title, description, character } = req.body;

    const campaign = await Campaign.create({
      title,
      description,
      character,
      owner: req.user._id,
    });
    console.log(campaign,'campaign');

    res.status(201).json( campaign );
  } catch (error) {
    next(error);
  }
};

export const getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ owner: req.user._id }).sort({ createdAt: -1 }).populate('owner','character');
    res.status(200).json({ campaigns });
  } catch (error) {
    next(error);
  }
};

export const getCampaignById = async (req, res, next) => {
  console.log('getting campaign by Id',req.params.id);
  try {
    const campaign = await Campaign.findById(req.params.id).populate('owner');
    console.log({campaign});
    await campaign.populate('character');
    console.log({campaign});
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    res.status(200).json( campaign );
  } catch (error) {
    next(error);
  }
};

export const updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('owner');
    await campaign.populate('character');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }

    res.status(200).json( campaign );
  } catch (error) {
    next(error);
  }
};

export const publishCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('owner');
    await campaign.populate('character');
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
  console.log(req.params.id);
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }  

    res.status(200).json({ message: 'Campaign deleted successfully.' });
  } catch (error) {
    console.error('Delete Campaign Error:', error);
    next(error);
  }  
};  


export const likeCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    const userId = req.user._id;

    if (campaign.likes.includes(_id)) {
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

export const deleteAllCampaign = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const campaigns = await Campaign.deleteMany(req.params.id);
    res.status(200).json({ message: 'Campaigns deleted successfully.' });
  } catch (error) {
    console.error('Delete Campaign Error:', error);
    next(error);
  }
};
    