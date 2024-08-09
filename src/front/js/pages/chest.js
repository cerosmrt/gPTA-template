import React, { useEffect, useState } from "react";

export const Chest = () => {
  // State to store the fetched scrolls
  const [scrolls, setScrolls] = useState([]);
  // State to store any error that occurs during fetching
  const [error, setError] = useState(null);
  // State to store the scroll being edited
  const [editingScroll, setEditingScroll] = useState(null);
  // State to store the edited title
  const [editedTitle, setEditedTitle] = useState("");

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

  // Function to handle click on a scroll
  const handleScrollClick = (scroll) => {
    setEditingScroll(scroll.id);
    setEditedTitle(scroll.title);
  };

  // Function to handle change in the input field
  const handleInputChange = (e) => {
    setEditedTitle(e.target.value);
  };

  // Function to save the edited scroll
  const handleSave = (scrollId) => {
    const updatedScrolls = scrolls.map((scroll) =>
      scroll.id === scrollId ? { ...scroll, title: editedTitle } : scroll
    );
    setScrolls(updatedScrolls);
    setEditingScroll(null);
  };

  // Function to delete a scroll
  const handleDelete = (scrollId) => {
    fetch(
      `${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls/${scrollId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Update the state only if the delete request was successful
        const updatedScrolls = scrolls.filter((scroll) => scroll.id !== scrollId);
        setScrolls(updatedScrolls);
      })
      .catch((error) => {
        console.error("Error deleting scroll:", error);
      });
  };
  
  // Render the list of scrolls
  return (
    <div className="homepageContainer">
      <h1>Scrolls</h1>
      <ul>
        {scrolls.map((scroll) => (
          <li key={scroll.id}>
            {editingScroll === scroll.id ? (
              <input
                type="text"
                value={editedTitle}
                onChange={handleInputChange}
                onBlur={() => handleSave(scroll.id)}
              />
            ) : (
              <span onClick={() => handleScrollClick(scroll)}>
                {scroll.title}
              </span>
            )}
            <button onClick={() => handleDelete(scroll.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
