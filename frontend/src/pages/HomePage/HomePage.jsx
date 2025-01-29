import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedCampaigns } from '../../services/campaignService';
import './HomePage.css'; 
import fantasyImage from '../../assets/fantasy-home.jpg'; 

export default function HomePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getPublishedCampaigns();
        setCampaigns(response.data);
      } catch (err) {
        setError('Failed to load campaigns. Please try again later.');
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <img src={fantasyImage} alt="Fantasy Landscape" className="HomePage-image" />
        <h1>Welcome to the Fantasy RPG Campaigns</h1>
        <p>Create, explore, and share your epic adventures.</p>
        <div className="HomePage-cta">
          <Link to="/campaigns/published" className="HomePage-button">
            Explore Campaigns
          </Link>
          <Link to="/campaigns/new" className="HomePage-button primary">
            Create a Campaign
          </Link>
        </div>
      </header>

      <section className="HomePage-featured">
        <h2>Featured Campaigns</h2>
        {error && <p className="error">{error}</p>}
        <div className="HomePage-campaigns">
          {campaigns.length > 0 ? (
            campaigns.slice(0, 3).map((campaign) => (
              <div key={campaign._id} className="HomePage-campaignCard">
                <h3>{campaign.title}</h3>
                <p>{campaign.description.substring(0, 100)}...</p>
                <Link to={`/campaigns/${campaign._id}`} className="HomePage-link">
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <p>No campaigns available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}