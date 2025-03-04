import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getCampaignById, deleteCampaign, updateCampaign, publishCampaign } from '../services/campaignService.js';
import CommentSection from '../components/CommentSection.jsx';
import CharacterSelection from '../components/CharacterSelection.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { getCharacters } from '../services/characterService';
import { generateNarrative, continueNarrative } from '../services/openaiService.js';
import { getToken } from '../services/authService.js';
import './CampaignDetailPage.css'; 

const CampaignDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState(null);
  const [loadingNarrative, setLoadingNarrative] = useState(false);
  const [narrative, setNarrative] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', character: '' });
  const [characters, setCharacters] = useState([]);
  const [userResponse, setUserResponse] = useState('');
  const [conversationsHistory, setConversationsHistory] = useState([]);
  const [adventureStarted, setAdventureStarted] = useState(false);

  const token = getToken();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const campaignData = await getCampaignById(id);
        console.log({ campaignData });
        setCampaign(campaignData);
        setFormData({
          title: campaignData?.title,
          description: campaignData?.description,
          character: campaignData?.character,
        });
        setConversationsHistory(campaignData.conversationsHistory || []);

        const charactersData = await getCharacters();
        setCharacters(charactersData);
      } catch (err) {
        console.error(err);
        setError('Failed to load campaign.');
      }
    };
    fetchCampaign();
  }, [id]);

  const handleUserResponse = async (e) => {
    e.preventDefault();
    if (!userResponse.trim()) return;
    try {
      const response = await continueNarrative(campaign._id, userResponse);
      setNarrative(response.narrative);
      setConversationsHistory(response.conversationsHistory);
      setUserResponse('');
    } catch (err) {
      console.error('Failed to continue narrative. Please try again.', err);
      setError('Failed to continue narrative. Please try again.');
    }
  };

  const handleToggleUpdate = () => {
    setIsUpdating(!isUpdating);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      console.error('Required fields missing');
      return;
    }

    try {
      if (campaign.owner._id !== user._id) {
        console.log({ owner: campaign.owner, user });
        setError('Unauthorized to edit this campaign');
        return;
      }
      const updatedCampaign = await updateCampaign(id, formData);
      console.log(updatedCampaign);
      setCampaign(updatedCampaign);
      setFormData({
        title: updatedCampaign.title,
        description: updatedCampaign.description,
        character: updatedCampaign.character,
      });
      handleToggleUpdate();
    } catch (err) {
      console.error('Failed to update campaign. Please try again.', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCharacter = (character) => {
    setFormData({ ...formData, character });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (campaign.owner._id !== user._id) {
        setError('Unauthorized to delete this campaign');
        return;
      }
      await deleteCampaign(id);
      navigate('/campaigns');
    } catch (err) {
      console.error('Failed to delete campaign. Please try again.', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStartCampaign = async () => {
    try {
      if (campaign.owner._id !== user._id) {
        setError('Unauthorized to start this campaign');
        return;
      }
      setLoadingNarrative(true);
      const response = await generateNarrative(campaign._id);
      setNarrative(response.narrative);
      setAdventureStarted(true);
    } catch (err) {
      console.error('Failed to generate narrative. Please try again.', err);
      setError('Failed to generate narrative. Please try again.');
    } finally {
      setLoadingNarrative(false);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!campaign) {
    return <p>Loading campaign...</p>;
  }

  return (
    <div className="campaign-detail-container">
      <h2>{campaign.title}</h2>
      <p>
        <img src={campaign.character.image} alt={campaign.character.name} />
      </p>
      <p><strong>Character:</strong> {campaign.character.name}</p>
      <p><strong>Description:</strong> {campaign.character.description}</p>
      <p><strong>Campaign Title:</strong> {campaign.title}</p>
      <p><strong>Campaign Description:</strong> {campaign.description}</p>
      <button type="button" onClick={handleStartCampaign}>
        Start Your Adventure
      </button>
      <button type="button" onClick={handleToggleUpdate}>
        {isUpdating ? 'Cancel' : 'Edit'}
      </button>
      <button type="button" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting Campaign...' : 'Delete'}
      </button>
      {loadingNarrative && <p>Your adventure is loading...</p>}
      {narrative && (
        <div className="narrative-section">
          <p>{narrative}</p>
          <h3>What will you do?</h3>
        </div>
      )}
      <div className="conversation-history">
        {conversationsHistory.map((msg, index) => (
          <p key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You' : 'GM'}:</strong> {msg.content}
          </p>
        ))}
      </div>
      {adventureStarted && (
        <form onSubmit={handleUserResponse}>
          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Write your response to the narrative..."
            required
          ></textarea>
          <button type="submit">Continue the Adventure</button>
        </form>
      )}
      {isUpdating && campaign && (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="title">Campaign Title</label>
            <input
              id="title"
              name="title"
              value={formData?.title}
              onChange={handleChange}
              required
              placeholder="Campaign Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Campaign Description</label>
            <textarea
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              required
              placeholder="Campaign Description"
              rows="5"
            ></textarea>
          </div>
          <div className="character-selection">
            <CharacterSelection
              characters={characters}
              selectedCharacterId={campaign?.character._id}
              onSelectCharacter={handleSelectCharacter}
            />
          </div>
          <button type="submit">Edit Campaign</button>
        </form>
      )}
      {user && campaign.owner._id === user._id && !campaign.isPublished && (
  <button type="button" onClick={async () => {
    try {
      const updatedCampaign = await publishCampaign(campaign._id);
      setCampaign(updatedCampaign);
    } catch (error) {
      setError('Failed to publish campaign.');
      console.error(error);
    }
  }}>
    Publish Campaign
  </button>
)}
{campaign.isPublished && (
  <>
    <button type="button" onClick={async () => {
      try {
        await likeCampaign(campaign._id);
      } catch (error) {
        setError('Failed to like campaign.');
      }
    }}>
      Like Campaign
    </button>
    <CommentSection campaignId={campaign._id} token={token} />
  </>
)}
    </div>
  );
};

export default CampaignDetailPage;
