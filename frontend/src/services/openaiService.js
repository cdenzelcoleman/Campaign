import sendRequest from './sendRequest';

export async function generateNarrative(campaignId, prompt) {
  return await sendRequest('/api/openai/generate', 'POST', { campaignId, prompt });
}

export async function continueNarrative(campaignId, userResponse) {
  return await sendRequest('/api/openai/continue', 'POST', { campaignId, userResponse });
}