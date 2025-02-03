import sendRequest from './sendRequest';

export async function generateNarrative(campaignId, prompt) {
  return await sendRequest('/api/openai/generate', 'POST', { campaignId, prompt });
}