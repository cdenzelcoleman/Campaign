import React, {useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterSelection from '../components/CharacterSelection.jsx';
import { createCampaign, updateCampaign, deleteCampaign } from '../services/campaignService';
import { CHARACTERS } from '../Utils.js';
import { getCharacters } from '../services/characterService';
import './NewCampaignPage.css';

const presetCampaignOptions = [
  {title: 'Cyberpunk 2090', description: 'A neon-soaked world of high-tech crime and intrigue.'},
  {title: 'Cyberpunk Fantasy Realms', description: 'A blend of cyberpunk and fantasy elements in a dystopian world.'},
  {title: 'Space Opera', description: 'A galaxy-spanning adventure filled with aliens, starships, and intrigue.'},
  { title: "Cyperpunk Dragon's Lair", description: "A neon-soaked world of high-tech crime and intrigue, with dragons." },
  { title: "Cyberpunk The Lost Kingdom", description: "A blend of cyberpunk and fantasy elements in a dystopian world, with a lost kingdom to discover." },
  { title: "Mystic Quest", description: "Set forth on a magical quest filled with mystery and wonder." },
  { title: 'The Lost City of Zanbar', description: 'A city lost to time, hidden in the jungle. Rumors of treasure and danger abound.' },
  { title: 'The Haunted Keep', description: 'A once grand fortress, now abandoned and rumored to be haunted.' },
  { title: 'The Cursed Forest', description: 'A dark forest filled with ancient magic and deadly creatures.' },
  { title: 'The Sunken Temple', description: 'An ancient temple hidden beneath the waves, guarded by fearsome creatures.' },
  { title: 'The Tower of Sorcery', description: 'A tower filled with powerful magic and deadly traps.' },
  { title: 'The Tomb of the Forgotten King', description: 'A tomb filled with treasure and guarded by the undead.' },
  { title: 'The Crystal Caves', description: 'A network of caves filled with crystal formations and dangerous creatures.' },

];

const NewCampaign = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', characterId: ''});
  const [characters, setCharacters] = useState([]);


  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
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
      character: selectedCharacterId,
    }; 
    
    console.log(campaignData);
    
    try {

      const campaign = await createCampaign(campaignData);
      console.log(campaign);
      navigate(`/campaigns/${campaign._id}`);
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
  }, [id]);

  useEffect(() => {
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
  }, []);

  
  const handleCancel = () => {
    navigate(`/campaigns/${id}`);
  };

    
  return (
    <div className="new-campaign-page">
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

        <div className='character-selection'>       
        <CharacterSelection
          characters={characters}
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={handleSelectCharacter}
          />
        </div>
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default NewCampaign;