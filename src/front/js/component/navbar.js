import React from "react"; // Importing React to use JSX and create the functional component
import ParagraphFetcher from "./paragraphFetcher"; // Importing the ParagraphFetcher component for rendering random paragraphs
import "../../styles/navbar.css";

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
          {/* Container for the ParagraphFetcher component */}
          <ParagraphFetcher /> {/* Render the ParagraphFetcher component */}
        </div>
      </div>
    </nav>
  );
};
