import React, { useState } from 'react';
import './AddCharacterForm.css'; // Import the CSS file for this component

function AddCharacterForm({ onAddCharacter }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !imageUrl) {
      alert('Please enter both the name and image URL.');
      return;
    }

    // Create a new character object
    const newCharacter = {
      name: name,
      image: imageUrl, // Use the imageUrl directly as the image property
      additionalImage: image, // You can add additional properties for the image here if needed
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
        setImage('');
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
      <input
        type="url"
        placeholder="Additional Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Add Character</button>
    </form>
  );
}

export default AddCharacterForm;

