import sendRequest from './sendRequest';

export const getCampaigns = async () => {
  return await sendRequest('/campaigns');
};

export const getPublishedCampaigns = async () => {
  return await sendRequest('/campaigns/published');
};

export const getCampaignDetail = async (id) => {
  return await sendRequest(`/campaigns/${id}`);
};

export const createCampaign = async (campaignData, token) => {
  return await sendRequest('/campaigns', 'POST', campaignData, token);
};