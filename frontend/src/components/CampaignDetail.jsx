import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCampaignById, likeCampaign, commentCampaign, publishCampaign } from '../services/campaignService';
import CommentSection from './CommentSection';
const authController = require('../controllers/auth');

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [ error, setError ] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaignById(id);
        setCampaign(response.data);
      } catch (err) {
        setError('Failed to fetch campaign');
      }
    };
    fetchCampaign();
  }, [id]);

  const handlePublish = async () => {
    try {
      const response = await publishCampaign(id, token);
      setCampaign(response.data.campaign);
    } catch (err) {
      setError('Failed to publish campaign');
    }
  };

  const handleLike = async () => {
    try{
      await likeCampaign(id, token);
      setCampaign({...campaign,likes: [...campaign.likes, 'currrentUserid']});
      } catch (err) {
        setError('Failed to like campaign');
      }
    };

    if (!campaign) return <p>Loading...</p>;

    return (
      <div>
        <h1>{campaign.title}</h1>
        <p>{campaign.description}</p>
        <p>Likes: {campaign.likes.length}</p>
        {token && (
          <>
          <button onClick={handleLike}>Like</button>
          <button onClick={handlePublish} disabled={campaign.published}>{campaign.published ? 'Published' : 'Publish' }
                     </button>
          </>
        )}
        <CommentSection campaignId={id} comments={campaign.comments} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  };

  export default CampaignDetail;