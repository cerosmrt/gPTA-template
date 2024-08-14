import React, { useState, useRef, useEffect, useContext } from "react"; // Import necessary hooks and components from React.
import ReactQuill from "react-quill"; // Import the ReactQuill component for rich text editing.
import "react-quill/dist/quill.snow.css"; // Import the Quill CSS for the editor's styling.
import { Context } from "../store/appContext"; // Import the Context from your application state management.
import { Link } from "react-router-dom"; // Import the Link component for navigation.
import ParagraphFetcher from "../component/paragraphFetcher"; // Import custom component for fetching paragraphs.
import SaveButton from "../component/save"; // Import the SaveButton component.
import { handleSave } from "../component/save"; // Import the handleSave function.

export function Editor() {
  const [editorState, setEditorState] = useState(""); // State to store the content of the editor.
  const [initialContentSet, setInitialContentSet] = useState(false); // State to check if initial content has been set.
  const quillRef = useRef(null); // Ref to access the Quill editor instance.
  const { store, setParagraph } = useContext(Context); // Access global state and actions from context.
  const artist_id = localStorage.getItem("artist_id"); // Retrieve artist ID from local storage.
  const [isEditing, setIsEditing] = useState(false); // State to track if the editor is currently being edited.
  const intervalRef = useRef(null); // Ref to store interval for periodic actions.
  const [selectedRange, setSelectedRange] = useState(null); // State to track the selected text range in the editor.

  useEffect(() => {
    const fetchLines = async () => {
      try {
        console.log("Fetching lines...");
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/voided-lines` // Fetch content from backend API.
        );
        if (!response.ok) {
          throw new Error("Failed to fetch voided lines");
        }
        const data = await response.json();
        const formattedText = data
          .map((line) => `${line.text}`)
          .join("<br>.<br>"); // Format fetched lines for display.
        console.log("Fetched and formatted text:", formattedText);
        setEditorState(formattedText); // Set the fetched content in the editor.
        setInitialContentSet(true); // Mark the initial content as set.
      } catch (error) {
        console.log("Fetch error:", error); // Handle errors during fetch.
      }
    };

    fetchLines(); // Fetch lines on component mount.
    intervalRef.current = setInterval(fetchLines, 1000000); // Set up interval to periodically fetch lines.

    return () => clearInterval(intervalRef.current); // Cleanup interval on component unmount.
  }, []); // Empty dependency array means this runs only on mount.

  const modules = {
    toolbar: false, // Disable the toolbar in the Quill editor.
  };

  useEffect(() => {
    if (quillRef.current && initialContentSet) {
      const editor = quillRef.current.getEditor(); // Get the Quill editor instance.
      console.log("Setting editor content:", editorState);
      editor.clipboard.dangerouslyPasteHTML(editorState); // Set the initial content in the editor.
      editor.formatLine(0, editor.getLength(), "align", "center"); // Center-align the content.
    }
  }, [initialContentSet]); // Run this effect when the initial content is set.

  const handleChange = (value) => {
    console.log("Editor content changed:", value);
    setEditorState(value); // Update the editorState when the content changes.
    setParagraph(value); // Update global state with the new content.
    handleSave(value); // Save the content.
    setIsEditing(true); // Mark as editing.
    clearInterval(intervalRef.current); // Clear the fetch interval during editing.

    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(); // Get the current selection range in the editor.
      console.log("Current selection range on change:", range);
      setSelectedRange(range); // Save the selected range.
    }
  };

  const handleBlur = () => {
    console.log("Editor lost focus.");
    setIsEditing(false); // Stop marking as editing when the editor loses focus.
  };

  const insertParagraphAtCursor = async () => {
    if (quillRef.current && store.paragraph) {
      const editor = quillRef.current.getEditor(); // Get the Quill editor instance.
      let range = selectedRange || editor.getSelection(true); // Use stored range or get current selection.
      console.log("Range before insertion:", range);

      if (range) {
        console.log("Clearing selected text...");
        editor.deleteText(range.index, range.length); // Clear the selected text.

        console.log("Inserting new paragraph at:", range.index);
        editor.clipboard.dangerouslyPasteHTML(range.index, store.paragraph); // Insert new paragraph at the cursor.

        console.log("Updating selection to highlight new paragraph.");
        editor.setSelection(range.index, store.paragraph.length); // Highlight the new paragraph.
        setSelectedRange({
          index: range.index,
          length: store.paragraph.length,
        }); // Update selected range state.
      } else {
        console.log("No range selected."); // Log if no text range was selected.
      }
    } else {
      console.log("Editor or paragraph not available."); // Log if the editor or paragraph is not available.
    }
  };

  useEffect(() => {
    if (store.paragraph) {
      console.log("Store paragraph updated, inserting at cursor.");
      insertParagraphAtCursor(); // Insert the paragraph when the store's paragraph updates.
    }
  }, [store.paragraph]); // Run this effect when the paragraph in the store changes.

  useEffect(() => {
    if (!isEditing) {
      intervalRef.current = setInterval(() => {
        // Uncomment fetchLines() if periodic fetch is required.
        // fetchLines();
      }, 100000);
    }

    return () => clearInterval(intervalRef.current); // Cleanup interval on component unmount or isEditing change.
  }, [isEditing]); // Run this effect when isEditing changes.

  return (
    <div tabIndex={0} onBlur={handleBlur}>
      {" "}
      {/* Make the div focusable and handle blur events */}
      <ParagraphFetcher className="randomParagraphButton" />{" "}
      {/* Button to fetch random paragraphs */}
      <SaveButton editorState={editorState} handleSave={handleSave} />{" "}
      {/* Button to save the content */}
      <ReactQuill
        className="invisible-editor"
        ref={quillRef}
        theme="snow"
        value={editorState}
        modules={modules}
        onChange={handleChange} // Handle changes in the editor content
      />
      <Link to={`/${artist_id}/chest/${scroll.id}`}>cocacola</Link>{" "}
      {/* Link to the chest page */}
    </div>
  );
}
