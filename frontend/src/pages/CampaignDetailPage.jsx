import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCampaignById } from '../services/campaignService.js';
import './CampaignDetailPage.css'; 

const CampaignDetailPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaignById(id);
        setCampaign(response.campaign);
      } catch (err) {
        console.error(err);
        setError('Failed to load campaign.');
      }
    };

    fetchCampaign();
  }, [id]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!campaign) {
    return <p>Loading campaign...</p>;
  }

  return (
    <div className="campaign-detail-container">
      <h2>{campaign.title}</h2>
      <p><strong>Character:</strong> {campaign.character}</p>
      <p><strong>Description:</strong> {campaign.description}</p>
    </div>
  );
};

export default CampaignDetailPage;