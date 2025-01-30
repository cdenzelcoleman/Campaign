import sendRequest from './sendRequest';

export const generateNarrative = async (prompt, token) => {
  return await sendRequest('/openai/generate', 'POST', { prompt }, token);
};