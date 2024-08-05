import React from 'react';

const SaveButton = ({ onSave }) => {
    return (
        <button onClick={onSave} className="save-button">
            Save
        </button>
    )
}

export default SaveButton;
