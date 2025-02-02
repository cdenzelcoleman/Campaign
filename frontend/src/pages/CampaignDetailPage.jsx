import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getCampaignById, deleteCampaign, updateCampaign } from '../services/campaignService.js';
import CharacterSelection from '../components/CharacterSelection.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { CHARACTERS } from '../Utils.js';
import { getCharacters } from '../services/characterService';
import './CampaignDetailPage.css'; 

const CampaignDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
   const [formData, setFormData] = useState({ title: campaign?.title , description: campaign?.description, character: campaign?.character });
   const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const campaign = await getCampaignById(id);
        console.log({campaign});
        setFormData({ title: campaign?.title , description: campaign?.description, character: campaign?.character })
        setCampaign(campaign);
      } catch (err) {
        console.error(err);
        setError('Failed to load campaign.');
      }
    };
    const fetchCharacters = async () => {
          try {
            const characters = await getCharacters();
            setCharacters(characters);
          } catch (error) {
            console.error('Failed to load characters.');
            console.error(error);
          }
        };
        fetchCharacters();

    fetchCampaign();
  }, [id]);

  const handleisUpdating = () => {
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
        console.log({owner: campaign.owner, user});
        setError('Unauthorized to edit this campaign');
        return;
      }
      const updatedCampaign = await updateCampaign(id, formData);
      console.log(updatedCampaign);
      setCampaign(updatedCampaign);
      setFormData({ title: updatedCampaign.title , description: updatedCampaign.description, character: updatedCampaign.character });
      handleisUpdating();
    } catch (error) {
      console.error('Failed to update campaign. Please try again.');
      console.error(error);
    }
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCharacter = (character) => {
    setFormData({...formData, character});
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
    } catch (error) {
      console.error('Failed to delete campaign. Please try again.');
    } finally {
      setIsDeleting(false);
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
      <p><strong>Character:</strong> {campaign.character.name}</p>
      <p><strong>Description:</strong> {campaign.character.description}</p>
      <p><strong>Campaign Title:</strong>{campaign.title}</p>
      <p><strong>Campaign Description:</strong> {campaign.description}</p>
      <button type='button' onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting Campaign...' : 'Delete Campaign'}
            </button>
            <button type='button' onClick={handleisUpdating}>
              {isUpdating ? 'Cancel' : 'Edit'}
            </button>
            
            {isUpdating && campaign && (
              <form onSubmit={handleUpdate}>
                    <div className='form-group'>
                      <label htmlFor='title'>Campaign Title</label>
                      <input
                        id='title'
                        name='title'
                        value={formData?.title}
                        onChange={handleChange}
                        required
                        placeholder='Campaign Title'
                        />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='description'>Campaign Description</label>
                      <textarea
                        id='description'
                        name='description'
                        value={formData?.description}
                        onChange={handleChange}
                        required
                        placeholder='Campaign Description'
                        rows='5'
                        ></textarea>
                    </div>
            
                    <div className='character-selection'>       
                    <CharacterSelection
                      characters={characters}
                      selectedCharacterId={campaign?.character._id}
                      onSelectCharacter={handleSelectCharacter}
                      />
                    </div>
                    <button type='submit'>
                      Edit Campaign
                    </button>
                  </form>
            )}
    </div>
  );
};

export default CampaignDetailPage;