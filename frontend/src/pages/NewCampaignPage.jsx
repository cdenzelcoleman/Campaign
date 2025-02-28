import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterSelection from '../components/CharacterSelection.jsx';
import { createCampaign, updateCampaign, deleteCampaign, getCampaignById } from '../services/campaignService';
import { getCharacters } from '../services/characterService';
import './NewCampaignPage.css';

const presetCampaignOptions = [
  { title: 'Cyberpunk 2090', description: 'A neon-soaked world of high-tech crime and intrigue.' },
  { title: 'Cyberpunk Fantasy Realms', description: 'A blend of cyberpunk and fantasy elements in a dystopian world.' },
  { title: 'Space Opera', description: 'A galaxy-spanning adventure filled with aliens, starships, and intrigue.' },
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
  // formData now only holds the preset title/description and character selection
  const [formData, setFormData] = useState({ title: '', description: '', characterId: '' });
  const [selectedPresetIndex, setSelectedPresetIndex] = useState('');
  const [characters, setCharacters] = useState([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePresetSelect = (e) => {
    const index = e.target.value;
    setSelectedPresetIndex(index);
    if (index !== "") {
      const preset = presetCampaignOptions[index];
      setFormData({ ...formData, title: preset.title, description: preset.description });
    } else {
      setFormData({ ...formData, title: '', description: '' });
    }
  };

  const handleSelectCharacter = (characterId) => {
    setSelectedCharacterId(characterId);
    console.log(characterId);
  };

  const handleSubmit = async (e) => {
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
          // Optionally, you might want to check if the campaign matches one of your presets
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
      <div className="new-campaign-container">
        <h2>{isUpdating ? 'Update Campaign' : 'Create New Campaign'}</h2>
        <form onSubmit={isUpdating ? handleSubmit : handleSubmit}>
          <div className="form-group">
          <select
  id="presetCampaign"
  className="preset-dropdown"
  value={selectedPresetIndex}
  onChange={handlePresetSelect}
>
  <option value="">-- Choose a preset campaign --</option>
  {presetCampaignOptions.map((option, index) => (
    <option key={index} value={index}>
      {option.title}
    </option>
  ))}
</select>
          </div>

          {formData.title && (
            <div className="preset-preview">
              <h3>{formData.title}</h3>
              <p>{formData.description}</p>
            </div>
          )}

          {/* Character Selection */}
          <div className="character-selection">
            <CharacterSelection
              characters={characters}
              selectedCharacterId={selectedCharacterId}
              onSelectCharacter={handleSelectCharacter}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCampaign;
