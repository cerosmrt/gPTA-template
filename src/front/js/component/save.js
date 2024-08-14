import React, { useState, useEffect } from "react";

export const handleSave = async (editorState, scroll_id) => {
  try {
    const artist_id = localStorage.getItem("artist_id");
    if (!artist_id) {
      throw new Error("Artist ID not found");
    }

    const url = scroll_id
      ? `${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls/${scroll_id}`
      : `${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls`;

    const method = scroll_id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        content: formatEditorState(editorState),
      }),
    });
    console.log("token:", localStorage.getItem("token"));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Scroll saved successfully:", data);
    return data; // Return the saved scroll
  } catch (error) {
    console.log("Error saving scroll:", error);
  }
};

const formatEditorState = (editorState) => {
  const formattedContent = editorState.replace(
    /<p class="ql-align-center">\s*(.*?)\s*<\/p>/g,
    "$1."
  );
  return formattedContent.trim();
};

const SaveButton = ({ editorState, scroll_id, handleSave }) => {
  const onSave = () => {
    handleSave(editorState, scroll_id);
  };

  return <button onClick={onSave}>Save</button>;
};

export default SaveButton;
