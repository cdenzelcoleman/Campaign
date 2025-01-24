import axios from 'axios';

const API_URL = '/api/campaigns';

export const generateNarative = async (prompt, token) => {
  const config = {
    headers: {
      'Consent-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/generate-narative`, { prompt }, config);
  return response.data;
};

export const publishCampaign = async (id, token) => {
  return axios.put(`${API-URL}${id}/publish`, {}, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const likeCampaign = async (id, token) => {
  return axios.post(`${API_URL}/${id}/like`, {}, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const commentCampaign = async (id, comment, token) => {
  return axios.post(`${API_URL}/${id}/comment`, { comment }, {
    headers: {Authorization: `Bearer ${token}`}
  });
};