import React, { useState } from 'react';
import './DeleteCharacterButton.css';

function DeleteCharacterButton({ characterId, characterName, onDeleteCharacter }) {
  const [updatedName, setUpdatedName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleDeleteCharacter = () => {
    // Send a DELETE request to the backend to delete the character
    // ... (existing delete logic) ...
  };

  const handlePatchCharacter = () => {
    // Send a PATCH request to the frontend to update the character
    // ... (existing patch logic) ...
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updatedName) {
      alert('Please enter the updated name.');
      return;
    }

    // Perform the PATCH request to update the character's name
    handlePatchCharacter(updatedName);

    // Clear the form field and hide the form
    setUpdatedName('');
    setShowForm(false);
  };

  return (
    <div className="delete-character-container">
      <div className="character-name">{characterName}</div>
      {showForm ? (
        <form className="update-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Updated Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <button type="button" className="delete-button" onClick={handleDeleteCharacter}>
            Delete Character
          </button>
          <button type="button" className="update-button" onClick={() => setShowForm(true)}>
            Update Character
          </button>
        </>
      )}
    </div>
  );
}

export default DeleteCharacterButton;
