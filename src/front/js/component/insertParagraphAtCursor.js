import React, { useRef } from "react"; // Importing React create the functional component

// Function to insert the paragraph at the cursor position
const insertParagraphAtCursor = ({ paragraph }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const textNode = document.createTextNode(paragraph);

    range.insertNode(textNode);

    // Move the cursor to the end of the inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return <button onClick={handleClick}>Insert Paragraph</button>;
};

export default insertParagraphAtCursor;
