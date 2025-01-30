import sendRequest from './sendRequest';

const BASE_URL = '/api/campaigns';

export const createCampaign = async (campaignData) => {
  const response = await sendRequest('/', 'POST', campaignData);
  return response;
};

export const publishCampaign = async (id) => {
  const response = await sendRequest(`/${id}/publish`, 'PATCH');
  return response;
};

export const getCampaigns = async () => {
  const response = await sendRequest('/', 'GET');
  return response;
};

export const getCampaignById = async (id) => {
  const response = await sendRequest(`/${id}`, 'GET');
  return response;
};

export const updateCampaign = async (id, updatedData) => {
  const response = await sendRequest(`/${id}`, 'PATCH', updatedData);
  return response;
};

export const deleteCampaign = async (id) => {
  const response = await sendRequest(`/${id}`, 'DELETE');
  return response;
};


export const getCampaignDetail = async (id) => {
  return await sendRequest(`/campaigns/${id}`);
};

export const likeCampaign = async (id) => {
  return await sendRequest(`/campaigns/${id}/like`, 'PATCH');
};

export const addComment = async (id, commentData) => {
  return await sendRequest(`/campaigns/${id}/comments`, 'POST', commentData);
};