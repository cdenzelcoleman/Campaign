import React from 'react';
import PropTypes from 'prop-types';
import './CharacterSelection.css';

const CharacterSelection = React.memo(({ characters, selectedCharacterId, onSelectCharacter}) => {
    return (
        <div className='character-selection'>
            <h3>Choose Your Adventurer</h3>
            <div className='character-grid'>
            {characters.map((character) => (
          <div
            key={character._id}
            className={`character-card ${selectedCharacterId === character._id ? 'selected' : ''}`}
            onClick={() => onSelectCharacter(character._id)}
          >
            <img
              src={character.image}
              alt={`${character.role} - ${character.name}`}
              className="character-image"
            />
            <div className="character-info">
              <h4>{character.role}</h4>
              <p><strong>{character.name}</strong></p>
              <div className="character-description">
                {character.description}
              </div>
            </div>
          </div>
        ))}
        </div>
        </div>
    );
});

CharacterSelection.propTypes = {
    characters: PropTypes.array.isRequired,
    selectedCharacterId: PropTypes.string,
    onSelectCharacter: PropTypes.func.isRequired
};

export default CharacterSelection;