import React from 'react';
import PropTypes from 'prop-types';

const CharacterSelection = ({ characters, selectedCharacterId, onSelectCharacter}) => {
    return (
        <div className='character-selection'>
            <h3>Choose Your Adventurer</h3>
            <div className='character-grid'>
                {characters.map((character) =>(
                    < div
                    key={character.id}
                    className={`character-card ${selectedCharacterId === character.id ? 'selected' : ''}`}
                    onClick={() => onSelectCharacter(character.id)}
                    ><img src={character.image} alt={character.name} />
                        {/* <h3><p><strong>Name:</strong>{character.name}</p></h3> */}
                        <h4>{character.role}</h4>
                        <p>{character.description}</p>
                    </div>
                ))}
                </div>
        </div>
    );
};


CharacterSelection.propTypes ={
    characters: PropTypes.array.isRequired,
    selectedCharacterId: PropTypes.number,
    onSelectCharacter: PropTypes.func.isRequired,
};


export default CharacterSelection;