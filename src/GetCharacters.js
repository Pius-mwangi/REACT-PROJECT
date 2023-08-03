import React, { useEffect, useState } from 'react';
import './GetCharacters.css';
import AddCharacterForm from './AddCharacterForm';
import DeleteCharacterButton from './DeleteCharacterButton';

function GetCharacters() {
  const [characterData, setCharacterData] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((resp) => resp.json())
      .then((data) => {
        setCharacterData(data.results);
      });
  }, []);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCharacter = (newCharacter) => {
    // Add the new character to the existing characters using the setCharacterData
    setCharacterData([...characterData, newCharacter]);
  };

  const handleDeleteCharacter = (characterId) => {
    // Remove the character from the characterData array
    const updatedCharacters = characterData.filter((character) => character.id !== characterId);
    setCharacterData(updatedCharacters);
  };

  const filteredCharacters = characterData.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="character-container">
      <h2>Characters:</h2>
      <AddCharacterForm onAddCharacter={handleAddCharacter} />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search characters by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul className="character-list">
        {filteredCharacters.map((character) => (
          <li key={character.id} className="character-item">
            <img
              src={character.image}
              alt={character.name}
              onClick={() => handleCharacterClick(character)}
            />
            <div className="character-details">
              <p className="character-name">{character.name}</p>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              <p>Gender: {character.gender}</p>
              {/* Add more details as needed */}
            </div>
          </li>
        ))}
      </ul>

      {selectedCharacter && (
        <div className="character-modal-overlay" onClick={closeModal}>
          <div className="character-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            <h3>{selectedCharacter.name}</h3>
            <p>Status: {selectedCharacter.status}</p>
            <p>Species: {selectedCharacter.species}</p>
            <p>Gender: {selectedCharacter.gender}</p>
            {/* Add more details as needed */}
            <p>Origin: {selectedCharacter.origin.name}</p>
            <p>Last Location: {selectedCharacter.location.name}</p>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      <DeleteCharacterButton onDeleteCharacter={handleDeleteCharacter} />
    </div>
  );
}

export default GetCharacters;




