import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import ParagraphFetcher, {
  paragraphFetcher,
} from "../component/paragraphFetcher";
import "../../styles/home.css";

//what visitors will see when they open the website
export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="homepageContainer">
      <Navbar />
      <h1>
        {store.paragraph || "In the beginning..." || { paragraphFetcher }}
      </h1>
      <div className="homeFooter">
        <p className="createSubtitle">PLAY</p>
        <div className="buttons">
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
