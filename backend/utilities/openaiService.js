const {Configuration, OpenAIApi} = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });

const openai = new OpenAIApi(configuration);

const generateNarative = async (prompt) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 200,
        });
        return response.data.choices[0].text;
    } catch (error) {
        throw new Error("Fighting curse to generate narative");
    }
};

module.exports = {
    generateNarative,
};
