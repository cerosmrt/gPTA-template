import React, { useEffect, useState } from "react";
import "../../styles/chest.css";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from React Router

export const Chest = () => {
  // State to store the fetched scrolls
  const [scrolls, setScrolls] = useState([]);
  // State to store any error that occurs during fetching
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Retrieve artist_id from local storage
  const artist_id = localStorage.getItem("artist_id");
  console.log(artist_id);

  // useEffect hook to fetch scrolls when component mounts or artist_id changes
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        // Check if the response is okay (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update scrolls state with the fetched data
        setScrolls(data);
        console.log("Scrolls belonging to artist_id:", artist_id, data);
      })
      .catch((error) => {
        // Log and set error state if there's a problem fetching scrolls
        console.error("Error fetching scrolls:", error);
        setError(error);
      });
  }, [artist_id]); // Dependency array: fetch scrolls whenever artist_id changes

  // Function to delete a scroll
  const handleDelete = (scroll_id) => {
    fetch(
      `${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls/${scroll_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        // Check if the response is okay (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Update state to remove the deleted scroll
        const updatedScrolls = scrolls.filter(
          (scroll) => scroll.id !== scroll_id
        );
        setScrolls(updatedScrolls);
      })
      .catch((error) => {
        // Log error if there is an issue with deletion
        console.error("Error deleting scroll:", error);
      });
  };

  const handleClick = (scroll_id) => {
    navigate(`/editor/${scroll_id}`);
  };

  // Render the list of scrolls
  return (
    <div className="homepageContainer">
      <h1>Scrolls</h1>
      <ul>
        {scrolls.map((scroll) => (
          <li key={scroll.id} onClick={() => handleClick(scroll.id)}>
            <span>{scroll.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering li onClick
                handleDelete(scroll.id); // Call handleDelete to delete the scroll
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
