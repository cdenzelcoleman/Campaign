import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCampaignById } from '../services/campaignService';
import { AuthContext } from '../context/AuthContext.jsx';
import CommentSection from './CommentSection.jsx';
import NarrativeGenerator from './NarrativeGenerator.jsx';
import './CampaignDetail.css';
import { generateNarrative } from '../services/openaiService.js';
import { error } from 'winston';

  const CampaignDetailPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');
  const [narrative, setNarrative] = useState('');
  const [choices, setChoices] = useState([]); 
  const [loadingNarrative, setLoadingNarrative] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaignById(id);
        setCampaign(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load campaign details.');
      }
    };
    fetchCampaign();
  }, [id]);

  useEffect (() => {
    const generateInitialScenario = async () => {
      if (!campaign) return;
      try{
        setLoadingNarrative(true);

        const prompt = `You are an RPG scenario generator. The user is playing as a ${campaign.character}.
        Campaign: ${campaign.title}
        Description: ${campaign.description}
        Please provide an initial scenario with 4 multiple-choice options. Format them like:

        Scenario: <some text>
        Choices:
        1) <choice text>
        2) <choice text>
        3) <choice text>
        4) <choice text>
        `;
        /*if too vaugue use the following as a prompt to fill the gapps(write this later)*/

        const response = await generateNarrative(prompt);
        setNarrative(response.narrative);
        setChoices(response.choices);

      } catch (error) {
        console.error(error);
        setError('Failed to generate initial scenario');
      } finally {
      setLoadingNarrative(false);
    }
  };
  
  generateInitialScenario();
}, [campaign]);

if (error) {
  return <p className="error-message">{error}</p>;
}

if (!campaign) {
  return <p>Loading your adventure...</p>;
}
return (
  <div className="campaign-detail-container">
    <h2>{campaign.title}</h2>
    <p><strong>Character:</strong> {campaign.character}</p>
    <p><strong>Description:</strong> {campaign.description}</p>

    <div className="narrative-section">
      {loadingNarrative && <p>Your adventure continues...</p>}
      {narrative && (
        <div>
          <h3></h3>
          <p>{narrative}</p>
          <h3>What will you do?</h3>
        </div>
      )}
    </div>
  </div>
);
};

export default CampaignDetailPage;
