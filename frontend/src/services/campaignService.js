import sendRequest from './sendRequest.js';

const getCampaigns = async (token) => {
  return await sendRequest('/api/campaigns', 'GET', null, token);
};

const getPublishedCampaigns = async () => {
  return await sendRequest('/api/campaigns/published', 'GET');
};

const getCampaignById = async (id) => {
  return await sendRequest(`/api/campaigns/${id}`, 'GET');
};

const createCampaign = async (campaignData, token) => {
  return await sendRequest('/api/campaigns', 'POST', campaignData, token);
};

const updateCampaign = async (id, campaignData, token) => {
  return await sendRequest(`/api/campaigns/${id}`, 'PUT', campaignData, token);
};

const deleteCampaign = async (id, token) => {
  return await sendRequest(`/api/campaigns/${id}`, 'DELETE', null, token);
};

export {
  getCampaigns,
  getPublishedCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};