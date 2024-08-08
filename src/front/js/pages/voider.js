import React, { useContext } from "react"; // Import React library
import InputBox from "../component/inputBox"; // Import InputBox component
import RandomParagraph from "../component/randomParagraph"; // Importing the RandomParagraph component for rendering random paragraphs
import { Context } from "../store/appContext"; // Import the Context object from the appContext module
// import "../../styles/voider.css";

export const Voider = () => {
  // Define the Voider component
  const { store } = useContext(Context); // Import the Context object from the appContext module
  return (
    <div>
      <div id="circle">
        <RandomParagraph className="randomParagraphButton" />
        {store.paragraph ? <p>{store.paragraph}</p> : <InputBox />}
      </div>
    </div>
  );
};
