import React, { useContext } from "react";
import "../../styles/randomParagraph.css";
import { Context } from "../store/appContext";

const RandomParagraph = () => {
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

export default RandomParagraph;
