import React, { useState, useEffect } from "react";

export const handleSave = async (editorState, scroll_id) => {
  // Define the handleSave function with editorState and scroll_id parameters.
  try {
    const artist_id = localStorage.getItem("artist_id"); // Retrieve the artist ID from local storage.
    if (!artist_id) {
      throw new Error("Artist ID not found"); // Throw an error if the artist ID is not found.
    }

    const url = scroll_id
      ? `${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls/${scroll_id}` // Set the URL based on scroll_id.
      : `${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls`; // Set the URL based on scroll_id.

    const method = scroll_id ? "PUT" : "POST"; // Set the method based on scroll_id.

    const response = await fetch(url, {
      method, // Set the method for the fetch request.
      headers: {
        // Set the headers for the fetch request.
        "Content-Type": "application/json", // Set the content type to JSON.
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headers.
      },
      body: JSON.stringify({
        content: formatEditorState(editorState),
      }), // Stringify the editorState content.
    }); // Fetch the URL with the method, headers, and body.
    console.log("token:", localStorage.getItem("token")); // Log the token.

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response is not OK.
    }

    const data = await response.json(); // Parse the response body as JSON.
    console.log("Scroll saved successfully:", data); // Log the saved scroll.
    return data; // Return the saved scroll
  } catch (error) {
    // Catch any errors during save.
    console.log("Error saving scroll:", error); // Handle errors during save.
  }
};

const formatEditorState = (editorState) => {
  // Define the formatEditorState function with editorState parameter.
  const formattedContent = editorState.replace(
    // Replace center-aligned paragraphs with periods.
    /<p class="ql-align-center">\s*(.*?)\s*<\/p>/g,
    "$1."
  ); // Replace center-aligned paragraphs with periods.
  return formattedContent.trim(); // Format the editorState content.
};

const SaveButton = ({ editorState, scroll_id, handleSave }) => {
  // Define the SaveButton component with editorState, scroll_id, and handleSave props.
  const onSave = () => {
    handleSave(editorState, scroll_id); // Call handleSave with the editorState and scroll_id.
  };

  return <button onClick={onSave}>Save</button>; // Return a button that calls onSave on click.
};

export default SaveButton; // Export the SaveButton component.
