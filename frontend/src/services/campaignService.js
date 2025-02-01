import sendRequest from './sendRequest';

const BASE_URL = '/api/campaigns';

export const createCampaign = async (campaignData) => {
  const response = await sendRequest(`${BASE_URL}`, 'POST', campaignData);
  console.log(response);
  return response;
};

export const publishCampaign = async (id) => {
  const response = await sendRequest(`${BASE_URL}/${id}/publish`, 'PATCH');
  return response;
};

export const getCampaigns = async () => {
  const response = await sendRequest(`${BASE_URL}/`, 'GET');
  return response;
};

export const getCampaignById = async (id) => {
  const response = await sendRequest(`${BASE_URL}/${id}`, 'GET');
  return response;
};

export const updateCampaign = async (id, updatedData) => {
  console.log('updating campaign', id, updatedData);
  const response = await sendRequest(`${BASE_URL}/${id}`, 'PATCH', updatedData);
  console.log('Update Response:', response);
  return response;
};

export const deleteCampaign = async (id) => {
  console.log('deleting campaign', id);
  const response = await sendRequest(`${BASE_URL}/${id}`, 'DELETE');
  console.log('Delete Response:', response);
  return response;
};


export const getCampaignDetail = async (id) => {
  return await sendRequest(`${BASE_URL}/${id}`);
};

export const likeCampaign = async (id) => {
  return await sendRequest(`${BASE_URL}/${id}/like`, 'PATCH');
};

export const addComment = async (id, commentData) => {
  return await sendRequest(`${BASE_URL}/${id}/comments`, 'POST', commentData);
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

