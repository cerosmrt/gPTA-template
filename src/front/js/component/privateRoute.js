import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to check authentication
  const [userId, setUserId] = useState(""); // State to store user ID
  const [username, setUsername] = useState(""); // State to store username

  // Effect to fetch user details after component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // API call to fetch user details
        const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId); // Set user ID from response
          setUsername(data.username); // Set username from response
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails(); // Call the function to fetch user details
  }, []);

  // Effect to store user details in localStorage
  useEffect(() => {
    localStorage.setItem("userId", userId); // Store user ID
    localStorage.setItem("username", username); // Store username
  }, [userId, username]);

  // Effect to check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    setIsAuthenticated(!!token); // Update authentication state
  }, []);

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render the protected component if authenticated
  return <Component />;
};

// PropTypes validation
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
