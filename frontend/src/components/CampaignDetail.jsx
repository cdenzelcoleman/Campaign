import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCampaignById } from '../services/campaignService';
import { AuthContext } from '../context/AuthContext.jsx';
import CommentSection from './CommentSection.jsx';
import NarrativeGenerator from './NarrativeGenerator.jsx';
import './CampaignDetail.css';

const CampaignDetail = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaignById(id);
        setCampaign(response.data);
      } catch (err) {
        setError('Failed to load campaign details.');
      }
    };
    fetchCampaign();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!campaign) return <p>Loading campaign details...</p>;

  return (
    <div className="campaign-detail">
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
      <p><strong>Status:</strong> {campaign.published ? 'Published' : 'Draft'}</p>
      
      <NarrativeGenerator campaignId={id} token={token} />

      <CommentSection campaignId={id} token={token} />
    </div>
  );
};

export default CampaignDetail;