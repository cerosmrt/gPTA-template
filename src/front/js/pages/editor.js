import React, { useState, useRef, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ParagraphFetcher from "../component/paragraphFetcher";
import SaveButton from "../component/save";
import { handleSave } from "../component/save";

export function Editor() {
  const [editorState, setEditorState] = useState("");
  const [initialContentSet, setInitialContentSet] = useState(false);
  const quillRef = useRef(null);
  const { store, setParagraph } = useContext(Context);
  const artist_id = localStorage.getItem("artist_id");
  const [isEditing, setIsEditing] = useState(false);
  const intervalRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState(null); // Track selected range

  useEffect(() => {
    const fetchLines = async () => {
      try {
        console.log("Fetching lines...");
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/voided-lines`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch voided lines");
        }
        const data = await response.json();
        const formattedText = data
          .map((line) => `${line.text}`)
          .join("<br>.<br>");
        console.log("Fetched and formatted text:", formattedText);
        setEditorState(formattedText);
        setInitialContentSet(true);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchLines();
    intervalRef.current = setInterval(fetchLines, 1000000);

    return () => clearInterval(intervalRef.current); // Cleanup
  }, []);

  const modules = {
    toolbar: false,
  };

  useEffect(() => {
    if (quillRef.current && initialContentSet) {
      const editor = quillRef.current.getEditor();
      console.log("Setting editor content:", editorState);
      editor.clipboard.dangerouslyPasteHTML(editorState);
      editor.formatLine(0, editor.getLength(), "align", "center");
    }
  }, [initialContentSet]);

  const handleChange = (value) => {
    console.log("Editor content changed:", value);
    setEditorState(value);
    setParagraph(value); // Update context with new content
    handleSave(value);
    setIsEditing(true);
    clearInterval(intervalRef.current);

    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      console.log("Current selection range on change:", range);
      setSelectedRange(range);
    }
  };

  const handleBlur = () => {
    console.log("Editor lost focus.");
    setIsEditing(false); // Set editing to false when user stops editing
  };

  const insertParagraphAtCursor = async () => {
    if (quillRef.current && store.paragraph) {
      const editor = quillRef.current.getEditor();
      let range = selectedRange || editor.getSelection(true);
      console.log("Range before insertion:", range);

      if (range) {
        console.log("Clearing selected text...");
        editor.deleteText(range.index, range.length);

        console.log("Inserting new paragraph at:", range.index);
        editor.clipboard.dangerouslyPasteHTML(range.index, store.paragraph);

        console.log("Updating selection to highlight new paragraph.");
        editor.setSelection(range.index, store.paragraph.length);
        setSelectedRange({
          index: range.index,
          length: store.paragraph.length,
        });
      } else {
        console.log("No range selected.");
      }
    } else {
      console.log("Editor or paragraph not available.");
    }
  };

  useEffect(() => {
    if (store.paragraph) {
      console.log("Store paragraph updated, inserting at cursor.");
      insertParagraphAtCursor();
    }
  }, [store.paragraph]);

  useEffect(() => {
    if (!isEditing) {
      intervalRef.current = setInterval(() => {
        // fetchLines();
      }, 100000);
    }

    return () => clearInterval(intervalRef.current); // Cleanup
  }, [isEditing]);

  return (
    <div tabIndex={0} onBlur={handleBlur}>
      <ParagraphFetcher className="randomParagraphButton" />
      <SaveButton editorState={editorState} handleSave={handleSave} />
      <ReactQuill
        className="invisible-editor"
        ref={quillRef}
        theme="snow"
        value={editorState}
        modules={modules}
        onChange={handleChange}
      />
      <Link to={`/${artist_id}/chest/${scroll.id}`}>cocacola</Link>
    </div>
  );
}
