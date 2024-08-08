import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import RandomParagraph, { randomParagraph } from "../component/randomParagraph";
// import "../../styles/home.css";

//what visitors will see when they open the website
export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="homepageContainer">
      <Navbar />
      <h1>{store.paragraph || "In the beginning..." || { randomParagraph }}</h1>
      <p className="createSubtitle">Create</p>
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
  );
};
