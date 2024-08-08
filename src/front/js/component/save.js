import React from "react";

const handleSave = async (editorState) => {
  try {
    const artist_id = localStorage.getItem("artist_id");
    if (!artist_id) {
      throw new Error("Artist ID not found");
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/${artist_id}/chest/scrolls`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          content: formatEditorState(editorState),
        }),
      }
    );
    console.log("token:", localStorage.getItem("token"));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Scroll saved successfully:", data);
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

const SaveButton = ({ editorState }) => {
  return (
    <button onClick={() => handleSave(editorState)} className="save-button">
      Save
    </button>
  );
};

export default SaveButton;
