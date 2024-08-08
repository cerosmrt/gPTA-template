import React, { useState, useRef, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import RandomParagraph from "../component/randomParagraph";
import SaveButton from "../component/save";
import { Context } from "../store/appContext";

export function Editor() {
    const [editorState, setEditorState] = useState("");
    const quillRef = useRef(null);
    const { store } = useContext(Context);

    useEffect(() => {
        const fetchLines = async () => {
            try {
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
                setEditorState(formattedText);
            } catch (error) {
                console.log("Fetch error:", error);
            }
        };

        fetchLines();
    }, []);

    const modules = {
        toolbar: false,
    };

    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            editor.clipboard.dangerouslyPasteHTML(editorState);
            editor.formatLine(0, editor.getLength(), "align", "center");
        }
    }, [editorState]);

    return (
        <div tabIndex={0}>
            <RandomParagraph className="randomParagraphButton" />
            <SaveButton editorState={editorState} />
            <ReactQuill
                className="invisible-editor"
                ref={quillRef}
                theme="snow"
                value={editorState}
                modules={modules}
                onChange={(value) => setEditorState(value)}
            />
            <p>{store.paragraph}</p>
        </div>
    );
}