import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import GetCharacters from './GetCharacters';
import OtherFunctionalities from './OtherFunctionalities';
import EpisodeList from './EpisodeList';

function App() {
  const [episodeData, setEpisodeData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then((resp) => resp.json())
      .then((data) => {
        setEpisodeData(data.results);
      });

    fetch('https://rickandmortyapi.com/api/location')
      .then((resp) => resp.json())
      .then((data) => {
        setLocationData(data.results);
      });

    fetch('http://localhost:3001/characters') // Fetch characters from the backend server (JSON Server)
      .then((resp) => resp.json())
      .then((data) => {
        setCharacterData(data);
      });
  }, []);

  const handleAddCharacter = (newCharacter) => {
    // Send a POST request to the backend to add the new character
    fetch('http://localhost:3001/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCharacter),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new character to the existing characters
        setCharacterData([...characterData, data]);
      })
      .catch((error) => {
        console.error('Error adding character:', error);
        alert('Failed to add character. Please try again later.');
      });
  };

  const handleDeleteCharacter = (characterId) => {
    // Send a DELETE request to the backend to delete the character
    fetch(`http://localhost:3001/characters/${characterId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete character.');
        }
        return response.json();
      })
      .then(() => {
        // Remove the character from the characterData array
        const updatedCharacters = characterData.filter((character) => character.id !== characterId);
        setCharacterData(updatedCharacters);
      })
      .catch((error) => {
        console.error('Error deleting character:', error);
        alert('Failed to delete character. Please try again later.');
      });
  };

  const handlePatchCharacter = (characterId, updatedName) => {
    // Send a PATCH request to the backend to update the character
    fetch(`http://localhost:3001/characters/${characterId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update character.');
        }
        return response.json();
      })
      .then((data) => {
        // Find the character in the characterData array and update its name
        const updatedCharacters = characterData.map((character) => {
          if (character.id === characterId) {
            return { ...character, name: data.name };
          }
          return character;
        });
        setCharacterData(updatedCharacters);
        alert('Character updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating character:', error);
        alert('Failed to update character. Please try again later.');
      });
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/other-functionalities">Other Functionalities</Link>
            </li>
            <li>
              <Link to="/episodes">Episodes</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home characterData={characterData} onAddCharacter={handleAddCharacter} />} />
          <Route path="/other-functionalities" element={<OtherFunctionalities />} />
          <Route path="/episodes" element={<EpisodeList episodeData={episodeData} />} />
        </Routes>

        <div className="location-section">
          <h2>Locations:</h2>
          <ul className="location-list">
            {locationData.map((location) => (
              <li key={location.id} className="location-item">
                {location.name} - {location.type}
              </li>
            ))}
          </ul>
        </div>

        {characterData.length > 0 && (
          <GetCharacters
            characterData={characterData}
            onAddCharacter={handleAddCharacter}
            onDeleteCharacter={handleDeleteCharacter}
            onPatchCharacter={handlePatchCharacter}
          />
        )}

        <div className="episode-section">
          <h2>Episodes:</h2>
          <ul className="episode-list">
            {episodeData.map((episode) => (
              <li key={episode.id} className="episode-item">
                <span className="episode-icon">📺</span>
                {episode.name} - {episode.characters.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Router>
  );
}

function Home({ characterData, onAddCharacter, onDeleteCharacter, onPatchCharacter }) {
  return (
    <>
      <h1>My Rick and Morty App</h1>
      <GetCharacters
        characterData={characterData}
        onAddCharacter={onAddCharacter}
        onDeleteCharacter={onDeleteCharacter}
        onPatchCharacter={onPatchCharacter}
      />
    </>
  );
}

export default App;









