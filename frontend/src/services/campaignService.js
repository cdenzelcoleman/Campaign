import sendRequest from './sendRequest';

const API_URL = '/api/campaigns';

export const publishCampaign = async (campaignId, token) => {
  return await sendRequest(`${API_PATH}/${campaignId}/publish`, 'PUT', null, token);
};

export const unpublishCampaign = async (campaignId, token) => {
  return await sendRequest(`${API_PATH}/${campaignId}/unpublish`, 'PUT', null, token);
};

export const likeCampaign = async (campaignId, token) => {
  return await sendRequest(`${API_PATH}/${campaignId}/like`, 'PUT', null, token);
};

export const addComment = async (campaignId, text, token) => {
  return await sendRequest(`${API_PATH}/${campaignId}/comments`, 'POST', { text }, token);
};

export const getPublishedCampaigns = async () => {
  return await sendRequest(`${API_PATH}/published`, 'GET');
};