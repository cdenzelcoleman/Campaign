import { useState, useEffect, useContext } from 'react';
import { getCampaigns } from '../services/campaignService';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './CampaignListPage.css';

const CampaignListPage = () => {
  const { token } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns(token);
        setCampaigns(response.campaigns);
      } catch (error) {
        console.error('Failed to load campaigns:', error);
      }
    };
    fetchCampaigns();
  }, [token]);

  return (
    <div className="campaign-list-container">
      <h2>Your Campaigns</h2>
      {campaigns.length === 0 ? (
        <p>
          You have not created any campaigns yet. Click{' '}
          <Link to="/new-campaign">here</Link> to create one.
        </p>
      ) : (
        <ul className="campaign-list">
          {campaigns.map((campaign) => (
            <li key={campaign._id} className="campaign-item">
              <Link to={`/campaigns/${campaign._id}`}>
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignListPage;