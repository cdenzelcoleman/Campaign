const axios = require('axios');

module.exports.generateNarative = async (req, res) => {
    const {prompt} = req.body;
    if (!prompt) {
        return res.status(400).json({message: 'Prompt is required'});
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci/completions',
            {
                prompt: prompt,
                max_tokens: 100,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        res.json({narative: response.data.choices[0].text.trim()});
    } catch (error) {
        res.status(500).json({message: 'Error generating narative'});
    }
};