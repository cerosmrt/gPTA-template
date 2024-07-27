import React from 'react';
import styles from "../../styles/voider.css"; // Adjust the path as needed

export const Voider = () => {
    return (
        <div id="circle">
            <div 
                id="entry"
                contentEditable
                spellCheck="false"
            />
        </div>
    );
};


