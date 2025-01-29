import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCampaignById,
  publishCampaign,
  likeCampaign,
} from '../services/campaignService';
import CommentSection from './CommentSection';
import { AuthContext } from '../context/AuthContext';
import './CampaignDetail.css';

const CampaignDetail = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaignById(id);
        setCampaign(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch campaign');
      }
    };
    fetchCampaign();
  }, [id]);

  const handlePublish = async () => {
    try {
      const response = await publishCampaign(id, token);
      setCampaign(response.data.campaign);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish campaign');
    }
  };

  const handleLike = async () => {
    try {
      const response = await likeCampaign(id, token);
      setCampaign((prevCampaign) => ({
        ...prevCampaign,
        likes: response.data.likes, // Assuming backend returns the updated likes array
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to like campaign');
    }
  };

  if (!campaign) return <p>Loading...</p>;

  const isOwner = user && campaign.createdBy === user.id; // Adjust based on your user object structure

  return (
    <div className="campaign-detail">
      <h1>{campaign.title}</h1>
      <p>{campaign.description}</p>
      <p>Likes: {campaign.likes.length}</p>
      {token && (
        <>
          <button onClick={handleLike} className="like-button">
            Like
          </button>
          {isOwner && (
            <button
              onClick={handlePublish}
              disabled={campaign.published}
              className="publish-button"
            >
              {campaign.published ? 'Published' : 'Publish'}
            </button>
          )}
        </>
      )}
      <CommentSection campaignId={id} comments={campaign.comments} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CampaignDetail;