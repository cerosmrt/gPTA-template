import React, { useState, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../../styles/editor.css";
// import RandomParagraph from '../component/randomParagraph'; 

export function Editor() {
  const [editorState, setEditorState] = useState('');
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['list', 'bullet'],
    ],
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet'];

  const handleKeyDown = (event) => {
    if (!quillRef.current) return;

    if (event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      const selection = quillRef.current.getSelection();
      if (!selection || selection.length === 0) return;

      const range = selection.cloneRange();
      const content = quillRef.current.getContents(range);

      if (event.key === 'ArrowUp') {
        const previousBlock = quillRef.current.getPrevBlock(range.index);
        if (previousBlock) {
          range.setStart(previousBlock, 0);
          range.setEnd(range.start);
          quillRef.current.deleteText(range);
          quillRef.current.insertEmbed(range.index, 'text', content, formats);
        }
      } else {
        const nextBlock = quillRef.current.getNextBlock(range.index);
        if (nextBlock) {
          range.setEnd(nextBlock, 0);
          range.setStart(range.end);
          quillRef.current.deleteText(range);
          quillRef.current.insertEmbed(range.index, 'text', content, formats);
        }
      }

      // restore selection
      quillRef.current.setSelection(selection);
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorState}
        modules={modules}
        formats={formats}
        onChange={(value) => setEditorState(value)}
      />
    </div>
  );
}
