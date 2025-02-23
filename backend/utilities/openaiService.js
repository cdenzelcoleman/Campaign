import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateNarrative = async (messages) => {
  try {
    let messageArray = [];
    if (Array.isArray(messages)) {
      messageArray = messages;
    } else {
      messageArray = [
        { role: 'system', content: 'You are a fantasy RPG game master. Respond in 2-10 sentences.' },
        { role: 'user', content: messages },
      ];
    }

    const completion = await client.chat.completions.create({
      messages: messageArray,
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate narrative. Please try again later.');
  }
};
