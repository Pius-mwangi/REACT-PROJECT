// OtherFunctionalities.js

// OtherFunctionalities.js

import React, { useState } from 'react';
import './OtherFunctionalities.css';

function OtherFunctionalities({ characterData }) {
  const [randomEpisode, setRandomEpisode] = useState(null);
  const [randomResidence, setRandomResidence] = useState(null);

  const fetchRandomEpisode = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/episode');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setRandomEpisode(data.results[randomIndex]);
    } catch (error) {
      console.error('Error fetching random episode:', error);
    }
  };

  const fetchRandomResidence = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/location');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setRandomResidence(data.results[randomIndex]);
    } catch (error) {
      console.error('Error fetching random residence:', error);
    }
  };

  return (
    <div className="other-functionalities">
      <h2>Random episode&quote</h2>
      <div className="random-functionalities-container">
        <button onClick={fetchRandomEpisode}>Get Random Episode</button>
        {randomEpisode && (
          <div className="random-info">
            <h3>{randomEpisode.name}</h3>
            <p>Episode: {randomEpisode.episode}</p>
            <p>Air Date: {randomEpisode.air_date}</p>
          </div>
        )}
        <button onClick={fetchRandomResidence}>Get Random Residence</button>
        {randomResidence && (
          <div className="random-info">
            <h3>{randomResidence.name}</h3>
            <p>Type: {randomResidence.type}</p>
            <p>Dimension: {randomResidence.dimension}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OtherFunctionalities;

