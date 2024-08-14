import React, { useContext, useState } from "react";
import InputBox from "../component/inputBox";
import ParagraphFetcher from "../component/paragraphFetcher";
import { Context } from "../store/appContext";
import "../../styles/voider.css";

export const Voider = () => {
  const { store, setParagraph } = useContext(Context);
  const [inputValue, setInputValue] = useState(store.paragraph || "");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    setParagraph(inputValue);
  };

  return (
    <div>
      <div id="circle">
        <ParagraphFetcher className="randomParagraphButton" />
        {store.paragraph ? (
          <InputBox initialValue={store.paragraph} />
        ) : (
          <InputBox />
        )}
      </div>
    </div>
  );
};
