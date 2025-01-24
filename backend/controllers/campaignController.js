const Post = require('../models/post');
const { generateNarative } = require('../utilities/openaiService');

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

module.exports = {
  generateNarative: generateNarativeController,
};