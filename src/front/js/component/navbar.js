import React from "react"; // Importing React to use JSX and create the functional component
import RandomParagraph from "./randomParagraph"; // Importing the RandomParagraph component for rendering random paragraphs
// import "../../styles/navbar.css";

// Define the Navbar functional component
export const Navbar = () => {
  return (
    <nav className>
      {" "}
      {/* Navbar component with light background */}
      <div className="navbar-container">
        {" "}
        {/* Container for the navbar content */}
        <div className="button-container">
          {" "}
          {/* Container for the RandomParagraph component */}
          <RandomParagraph /> {/* Render the RandomParagraph component */}
        </div>
      </div>
    </nav>
  );
};
