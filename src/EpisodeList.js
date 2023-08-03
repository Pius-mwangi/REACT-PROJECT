import React from 'react';

function EpisodeList({ episodeData }) {
  return (
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
  );
}

export default EpisodeList;
