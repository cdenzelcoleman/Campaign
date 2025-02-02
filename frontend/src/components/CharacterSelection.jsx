import React from 'react';
import PropTypes from 'prop-types';
import './CharacterSelection.css';

const CharacterSelection = ({ characters, selectedCharacterId, onSelectCharacter}) => {
    return (
        <div className='character-selection'>
            <h3>Choose Your Adventurer</h3>
            <div className='character-grid'>
            {characters.map((character) => (
          <div
            key={character._id}
            className={`character-card ${selectedCharacterId === character._id ? 'selected' : ''}`}
            onClick={() => onSelectCharacter(character._id)}
          ><img className="character-image"
              src={character.image}
              alt={`${character.role} - ${character.name}`}
            /><h4>{character.role}</h4>
            <p>{character.description}</p>
            </div>
        ))}
        </div>
        </div>
    );
};

CharacterSelection.propTypes ={
    characters: PropTypes.array.isRequired,
    selectedCharacterId: PropTypes.string,
    onSelectCharacter: PropTypes.func.isRequired,
};


export default CharacterSelection;