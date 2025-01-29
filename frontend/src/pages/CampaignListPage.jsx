import React, { useState, useEffect, useContext } from 'react';
import { getCampaigns } from '../services/campaignService';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NavBar from '../components/NavBar/NavBar.jsx';

const CampaignListPage = () => {
  const { token } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns(token);
        setCampaigns(response.data);
      } catch (err) {
        setError('Failed to load campaigns');
      }
    };
    fetchCampaigns();
  }, [token]);

  return (
    <div>
      <NavBar />
      <h1>Your Campaigns</h1>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign._id}>
            <Link to={`/campaigns/${campaign._id}`}>{campaign.title}</Link> {campaign.published ? '(Published)' : '(Draft)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignListPage;
