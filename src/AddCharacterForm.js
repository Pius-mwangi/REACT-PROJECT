// AddCharacterForm.js

import React, { useState } from 'react';
import './AddCharacterForm.css'; // Import the CSS file for this component

function AddCharacterForm({ onAddCharacter }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !imageUrl) {
      alert('Please enter both the name and image URL.');
      return;
    }

    // Create a new character object
    const newCharacter = {
      name: name,
      image: imageUrl,
      // Add any additional properties you want to include in the character object
    };

    // Send a POST request to the backend to add the new character
    fetch('http://localhost:3000/characters', { // Replace 'http://localhost:3001/characters' with your JSON Server endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCharacter),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new character to the existing characters using the onAddCharacter callback
        onAddCharacter(newCharacter);

        // Reset the form fields
        setName('');
        setImageUrl('');
      })
      .catch((error) => {
        console.error('Error adding character:', error);
        alert('Failed to add character. Please try again later.');
      });
  };

  return (
    <form className="add-character-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Character Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">Add Character</button>
    </form>
  );
}

export default AddCharacterForm;

