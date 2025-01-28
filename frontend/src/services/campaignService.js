export const publishCampaign = async (campaignId) => {
  return sendRequest(`/api/campaigns/${campaignId}/publish`, 'PUT');
};

export const toggleLike = async (campaignId) => {
  return sendRequest(`/api/campaigns/${campaignId}/like`, 'PUT');
};

export const addComment = async (campaignId, text) => {
  return sendRequest(`/api/campaigns/${campaignId}/comments`, 'POST', { text });
};