import sendRequest from './sendRequest';

const BASE_URL = '/api/campaigns';

export const createCampaign = async (campaignData) => {
  const response = await sendRequest(`${BASE_URL}`, 'POST', campaignData, getToken());
  console.log(response);
  return response;
};

export const publishCampaign = async (id) => {
  const response = await sendRequest(`${BASE_URL}/${id}/publish`, 'PATCH',getToken());
  return response;
};

export const getCampaigns = async () => {
  const response = await sendRequest(`${BASE_URL}/`, 'GET',getToken());
  return response;
};

export const getCampaignById = async (id) => {
  const response = await sendRequest(`${BASE_URL}/${id}`, 'GET',getToken());
  return response;
};

export const updateCampaign = async (id, updatedData) => {
  const response = await sendRequest(`${BASE_URL}/${id}`, 'PATCH', updatedData,getToken());
  return response;
};

export const deleteCampaign = async (id) => {
  const response = await sendRequest(`${BASE_URL}/${id}`, 'DELETE',getToken());
  return response;
};


export const getCampaignDetail = async (id) => {
  return await sendRequest(`${BASE_URL}/${id}`,getToken());
};

export const likeCampaign = async (id) => {
  return await sendRequest(`${BASE_URL}/${id}/like`, 'PATCH',getToken());
};

export const addComment = async (id, commentData) => {
  return await sendRequest(`${BASE_URL}/${id}/comments`, 'POST', commentData,getToken());
};

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}