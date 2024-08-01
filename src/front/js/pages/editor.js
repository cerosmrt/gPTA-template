import React, { useState, useRef, useEffect } from "react"; // Import necessary React hooks and components
import ReactQuill from 'react-quill'; // Import ReactQuill for rich text editing
import 'react-quill/dist/quill.snow.css'; // Import Quill editor styles
import "../../styles/editor.css"; // Import custom styles for the editor
import { Navbar } from "react-bootstrap";
import RandomParagraph from "../component/randomParagraph";  // Importing the RandomParagraph component for rendering random paragraphs

export function Editor() {
  const [editorState, setEditorState] = useState(''); // State to store editor content
  const quillRef = useRef(null); // Reference for the ReactQuill component

  useEffect(() => {
    const fetchLines = async () => { // Define an async function to fetch data
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/voided-lines`); // Send a GET request to the '/api/voided-lines' endpoint
        if (!response.ok) { // Check if the response is not OK (status code not in the range 200-299)
          throw new Error('Failed to fetch voided lines'); // Throw an error if the network response was not ok
        }
        const data = await response.json(); // Parse the JSON data from the response
        const formattedText = data.map(line => `${line.text}`).join('<br>.<br>'); // Format the response with line breaks and dots
        setEditorState(formattedText); // Update the editor state with the formatted text
      } catch (error) {
        console.log('Fetch error:', error); // Log any errors that occur during the fetch operation
      }
    };

    fetchLines(); // Call the async function to fetch data when the component mounts
  }, []); // Empty dependency array to run only once on component mount

  const modules = { // Empty configuration for the Quill editor toolbar
    toolbar: false, // Disable the toolbar
  };

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.clipboard.dangerouslyPasteHTML(editorState); 
      editor.formatLine(0, editor.getLength(), 'align', 'center');
    }
  }, [editorState]);

  return (
    <div tabIndex={0}> {/* Make div focusable */}
      <RandomParagraph className="randomParagraphButton"/>
      <ReactQuill
        className="invisible-editor" // Add custom CSS class for the editor
        ref={quillRef} // Attach ref to the Quill editor
        theme="snow" // Set the editor theme
        value={editorState} // Set the editor content
        modules={modules} // Apply the editor configuration
        onChange={(value) => setEditorState(value)} // Update state on editor content change
      />
    </div>
  );
}
