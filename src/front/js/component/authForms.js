import React from "react";
import { Link } from "react-router-dom";  // Importing Link for client-side navigation within the application

// Define the AuthForm functional component
export const Authform = () => {
	return (
		<nav className="navbar navbar-light bg-light">  {/* Navbar element with Bootstrap classes for styling */}
			<div className="container">  {/* Container div to manage alignment and spacing using Bootstrap */}
				<Link to="/">  {/* Link component for navigation to the root of the application */}
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>  {/* Brand name of the navbar */}
				</Link>
				<div className="ml-auto">  {/* Div for aligning the next element to the right */}
					<Link to="/demo">  {/* Link component for navigation to the "/demo" route */}
						<button className="btn btn-primary">Check the Context in action</button>  {/* Button styled with Bootstrap for the demo route */}
					</Link>
				</div>
			</div>
		</nav>
	);
};
