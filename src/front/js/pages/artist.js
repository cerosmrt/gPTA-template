// Create the Artist page as a functional component.
// The Artist component should return all of the artists saved creations (texts) saved form the editor


import React from 'react';

// Assuming there's a context or service to fetch artist's creations
import { useArtistCreations } from '../services/artistService';

const Artist = () => {
  const creations = useArtistCreations(); // Custom hook to fetch creations

  return (
    <div>
      <h1>Artist's Creations</h1>
      <ul>
        {creations.map((creation, index) => (
          <li key={index}>{creation.text}</li> // Assuming each creation has a 'text' property
        ))}
      </ul>
    </div>
  );
};

export default Artist;