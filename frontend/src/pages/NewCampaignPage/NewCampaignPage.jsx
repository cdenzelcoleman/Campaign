import React, { useState, useContext } from 'react';
import { createCampaign } from '../services/campaignService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NavBar from '../components/NavBar/NavBar';

const NewCampaignPage = () => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Title and Description are required');
      return;
    }
    try {
      const response = await createCampaign({ title, description }, token);
      navigate(`/campaigns/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campaign');
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Create New Campaign</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-label="Campaign Title"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            aria-label="Campaign Description"
          />
        </div>
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export default NewCampaignPage;