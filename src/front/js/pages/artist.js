import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to fetch artist's creations
export const useArtistCreations = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreations = async () => {
      try {
        const response = await axios.get('/api/creations'); // API endpoint
        setCreations(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreations();
  }, []);

  return { creations, loading, error };
};

export const Artist = () => {
  const { creations, loading, error } = useArtistCreations();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
