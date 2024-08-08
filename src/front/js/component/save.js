import React from "react";

const handleSave = async (editorState) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/artist/chest/scrolls`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          content: editorState,
        }),
      }
    );
    console.log("token:", sessionStorage.getItem("token"));
    if (!response.ok) {
      throw new Error("Failed to save composition");
    }
    console.log("Composition saved successfully");
  } catch (error) {
    console.log("Save error:", error);
  }
};

const SaveButton = ({ editorState }) => {
  return (
    <button onClick={() => handleSave(editorState)} className="save-button">
      Save
    </button>
  );
};

export default SaveButton;
