import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/paragraphFetcher.css";

const ParagraphFetcher = () => {
  const { actions } = useContext(Context);

  const fetchParagraph = () => {
    actions.fetchParagraph();
  };

  return (
    <div className="randomParagraphButton">
      <button onClick={fetchParagraph}></button>
    </div>
  );
};

export default ParagraphFetcher;
