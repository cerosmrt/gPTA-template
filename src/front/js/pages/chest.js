import React, { useEffect, useState } from "react";

export const Chest = () => {
  // State to store the fetched scrolls
  const [scrolls, setScrolls] = useState([]);
  // State to store any error that occurs during fetching
  const [error, setError] = useState(null);

  const artist_id = localStorage.getItem("artist_id");
  console.log(artist_id);

  // useEffect hook to fetch scrolls from the database when the component mounts or artist_id changes
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        // Log the response to inspect it
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setScrolls(data);
        console.log("Scrolls belonging to artist_id:", artist_id, data);
      })
      .catch((error) => {
        console.error("Error fetching scrolls:", error);
        // Update the error state if an error occurs
        setError(error);
      });
  }, [artist_id]);

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
            <span>{scroll.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
