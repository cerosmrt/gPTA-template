import React, { useState, useRef, useEffect } from "react";
import "../../styles/inputBox.css";

const InputBox = ({ initialValue = "" }) => {
  const [text, setText] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const sendTextToBackend = async (text) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/voided-lines`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Text submitted:", data);
    } catch (error) {
      console.error("Error submitting text:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (text.trim()) {
        sendTextToBackend(text);
        setText("");
      }
    }
  };

  return (
    <div>
      <input
        id="entry"
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder=""
        className="entry-input"
      />
    </div>
  );
};

export default InputBox;
