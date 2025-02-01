import React, {useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterSelection from '../components/CharacterSelection.jsx';
import { createCampaign, updateCampaign, deleteCampaign } from '../services/campaignService';
import './NewCampaignPage.css';

const CHARACTERS = [
  {
    id: 1,
    role: 'Neon Shaman',
    name: 'Aetheris Vox',
    description: 'A mystical figure wielding glowing holographic runes and a staff made of pulsating light tubes. Their cybernetic implants enhance their spiritual connection to the digital plane, allowing them to summon spirit-like AI projections.',
  },
  {
    id: 2,
    role: 'Technomancer Priestess',
    name: 'Seraphina Core',
    description: 'A fusion of ancient magic and futuristic tech. They wear a flowing, glowing robe adorned with circuitry patterns and hover on an anti-gravity platform, casting spells via neural uplinks.',
  },
  {
    id: 3,
    role: 'Shadowblade Operative',
    name: 'Nyx Phantom',
    description: 'A stealthy assassin with retractable energy daggers and armor that mimics the surrounding environment. Their glowing, rune-covered mask shifts expressions, reflecting their mood or intent.',
  },
  {
    id: 4,
    role: 'Bio-Hacker Alchemist',
    name: 'Dr. Helix Vire',
    description: 'A rogue scientist with glowing vials strapped to their suit. Their cybernetic arm morphs into different tools, creating potions that mix technology and magic for unpredictable effects.',
  },
  {
    id: 5,
    role: 'Arcane Cyborg Gladiator',
    name: 'Titan Aegis',
    description: 'A towering figure clad in cybernetic armor engraved with ancient magical symbols. Their glowing plasma sword radiates both heat and magical energy, while their red cyber-eye tracks enemy movements.',
  },
];


const NewCampaign = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', characterId: '' });


  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCharacter = (characterId) => {
    setSelectedCharacterId(characterId);
    console.log(characterId);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      console.error('Required fields missing');
      return;
    }

    setIsSubmitting(true);

    const campaignData = {
      title: formData.title,
      description: formData.description,
      characterId: selectedCharacterId,
    }; 
    
    console.log(campaignData);
    
    try {

      const response = await createCampaign(campaignData);
      console.log(response);
      navigate(`/campaigns/${response.campaign._id}`);
    } catch (error) {
      console.error('Failed to create campaign. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) {
      setIsUpdating(true);
      const fetchCampaign = async () => {
        try {
          const response = await getCampaignById(id);
          setFormData({
            title: response.campaign.title,
            description: response.campaign.description,
          });
          setSelectedCharacterId(response.campaign.characterId);
        } catch (error) {
          console.error('Failed to load campaign details.');
          console.error(error);
        } finally {
          setIsUpdating(false);
        }
      };
      fetchCampaign();
    }
  });

  const handleUpdate = async () => {
    if (!formData.title || !formData.description) {
      console.error('Required fields missing');
      return;
    }

    setIsSubmitting(true);

    const updatedData = {
      title: formData.title,
      description: formData.description,
      characterId: selectedCharacterId,
    };

    try {
      await updateCampaign(id, updatedData);
      navigate(`/campaigns/${id}`);
    } catch (error) {
      console.error('Failed to update campaign. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/campaigns/${id}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCampaign(id);
      navigate('/campaigns');
    } catch (error) {
      console.error('Failed to delete campaign. Please try again.');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className='new-campaign-container'>
      <h2>{isUpdating ? 'Update Campaign' : 'Create New Campaign'}</h2>
      <form onSubmit={isUpdating ? handleUpdate : handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Campaign Title</label>
          <input
            id='title'
            name='title'
            value={formData.title}
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
            value={formData.description}
            onChange={handleChange}
            required
            placeholder='Campaign Description'
            rows='5'
            ></textarea>
        </div>
        <CharacterSelection
          characters={CHARACTERS}
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={handleSelectCharacter}
          />
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
        </button>
        {isUpdating && (
          <>
            <button type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button type='button' onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting Campaign...' : 'Delete Campaign'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default NewCampaign;









