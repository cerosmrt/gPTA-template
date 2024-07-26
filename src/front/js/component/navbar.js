import React from "react";  // Importing React to use JSX and create the functional component
import { Link } from "react-router-dom";  // Importing Link for client-side navigation within the application
import RandomParagraph from "./randomParagraph";  // Importing the RandomParagraph component for rendering random paragraphs
import styles from "../../styles/navbar.css";  // Importing the CSS module for the Navbar component

// Define the Navbar functional component
export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">  {/* Navbar component with light background */}
			<div className="container">  {/* Container for the navbar content */}
				<Link to="/">  {/* Link component for navigation to the home route */}
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>  {/* Navbar brand with the application name */}
				</Link>
				<div className="random-paragraph-container">  {/* Container for the RandomParagraph component */}	
					<RandomParagraph />  {/* Render the RandomParagraph component */}
				</div>
			</div>
		</nav>
	);
};
