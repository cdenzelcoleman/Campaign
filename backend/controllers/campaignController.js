const Post = require('../models/Campaign');
const { generateNarative } = require('../utilities/openaiService');
const Campaign = require('../models/Campaign');

const generateNarativeController = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }
  try {
    const narative = await generateNarative(prompt);
    res.status(200).json({ narative});
  } catch (error) {
    res.status(500).json({ message: 'Fighting Curse to generate narative' });
    }
  };

  exports.publishCampaign = async (req, res) => {
    try {
      const { id } = req.params;
      const campaign = await Campaign.findById(id);
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }

      if (campaign.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      campaign.published = true;
      await campaign.save();

      res.json({ message: 'Campaign published', campaign });
    } catch (error) {
      res.status(500).json({ message: 'Error publishing campaign' });
    }
  };

  exports.likeCampaign = async (req, res) => {
    try{
      const { id } = req.params;
      const campaign = await Campaign.findById(id);

      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }

      if (campaign.likes.includes(req.user._id)) {
        return res.status(400).json({ message: 'Campaign already liked' });
      }

      campaign.likes.push(req.user._id);
      await campaign.save();

      res.json({ message: 'Campaign liked', likes: campaign.likes.length });
    } catch (error) {
      res.status(500).json({ message: 'Error liking campaign' });
    }
  };

  exports.commentCampaign = async (req, res) => {
    try {
      const { id } = req.params;
      const { comment } = req.body;
      const campaign = await Campaign.findById(id);

      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }

      const newComment = {
        user: req.user._id,
        comment,
      };

      campaign.comments.push(newComment);
      await campaign.save();

      res.json({ message: 'Comment added', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Error commenting on campaign' });
    } 
  };







module.exports = {
  generateNarative: generateNarativeController,
};