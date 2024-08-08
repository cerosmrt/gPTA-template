import React, { useEffect, useState } from "react";

// This component should render in its page a list of scrolls that can be clicked to edit.
// The scrolls should be fetched from the database `${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls`.
// The scrolls should be displayed in a list.
// The scrolls should be clickable.
// The scrolls should be editable.
// The scrolls should be deletable.

export const Chest = ({ artist_id }) => {
  // State to store the fetched scrolls
  const [scrolls, setScrolls] = useState([]);
  // State to store any error that occurs during fetching
  const [error, setError] = useState(null);

  // useEffect hook to fetch scrolls from the database when the component mounts or artist_id changes
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls`)
      .then((response) => response.json())
      .then((data) => {
        // Update the scrolls state with the fetched data
        setScrolls(data);
      })
      .catch((error) => {
        // Update the error state if an error occurs
        setError(error);
      });
  }, [artist_id]);

  // Function to handle editing a scroll
  const handleEdit = (scrollId) => {
    // Implement edit functionality here
    console.log(`Edit scroll with ID: ${scrollId}`);
  };

  // Function to handle deleting a scroll
  const handleDelete = (scrollId) => {
    // Implement delete functionality here
    console.log(`Delete scroll with ID: ${scrollId}`);
  };

  // If an error occurs during fetching, display an error message
  if (error) {
    return <div>Error fetching scrolls: {error.message}</div>;
  }

  // Render the list of scrolls
  return (
    <div className="homepageContainer">
      <h1>Scrolls</h1>
      <ul>
        {scrolls.map((scroll) => (
          <li key={scroll.id}>
            <span onClick={() => handleEdit(scroll.id)}>{scroll.name}</span>
            <button onClick={() => handleDelete(scroll.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
