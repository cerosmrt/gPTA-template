import React, { useState } from "react"; // Import the useState hook.
import { Link, useNavigate } from "react-router-dom"; // Import the Link and useNavigate components from react-router-dom.
import "../../styles/register.css";

export const Register = () => {
  // Register component
  const [email, setEmail] = useState(""); // State variable email and setEmail function
  const [username, setUsername] = useState(""); // State variable username and setUsername function
  const [password, setPassword] = useState(""); // State variable password and setPassword function
  const [errors, setErrors] = useState({}); // State variable errors and setErrors function
  const [message, setMessage] = useState(""); // State variable message and setMessage function
  const history = useNavigate(); // Navigate function using the useNavigate hook

  const handlePasswordChange = (e) => {
    // handlePasswordChange function
    setPassword(e.target.value); // Update the password state variable
  };

  const handleSubmit = async (e) => {
    // handleSubmit function
    e.preventDefault(); // Prevent the default form submission behavior

    setErrors({}); // Reset the errors state variable
    setMessage(""); // Reset the message state variable

    if (!email || !username || !password) {
      // Check if email, username, or password are empty
      setErrors({ form: "All fields are required" }); // Set the form error message
      return; // Exit the function
    } // End the if statement

    console.log("Backend URL:", process.env.BACKEND_URL); // Debugging line

    try {
      // Try to execute the following code
      const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
        // Fetch the register API endpoint
        method: "POST", // Use the POST method
        headers: {
          // Set the request headers
          "Content-Type": "application/json", // Set the content type to JSON
        }, // End the headers
        body: JSON.stringify({ email, name: username, password }), // Set the request body to the email, username, and password
      }); // End the fetch function

      if (response.ok) {
        // Check if the response is OK
        setMessage("Registration successful!"); // Set the success message
        setTimeout(() => {
          // Set a timeout function
          history("/login"); // Redirect to the /login route
        }, 2000); // Set the timeout duration
      } else {
        // If the response is not OK
        const errorData = await response.json(); // Parse the error data
        setErrors({ form: errorData.msg || "Registration failed" }); // Set the error message
      } // End the if statement
    } catch (error) {
      // Catch any errors
      console.error("Error:", error); // Debugging line
      setErrors({ form: "An error occurred. Please try again." }); // Set the error message
    } // End the try-catch block
  }; // End the handleSubmit function

  return (
    // Return the following content
    <div className="register-container">
      <div className="signup-form">
        <h2>create</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              artist name <br />.
            </label>
            <input
              type="text"
              id="username"
              placeholder="Artist Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? "invalid" : ""}
              required
              autoFocus
            />
            {errors.username && (
              <div className="error-feedback">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "invalid" : ""}
              required
            />
            {errors.email && (
              <div className="error-feedback">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={errors.password ? "invalid" : ""}
              required
            />
            {errors.password && (
              <div className="error-feedback">{errors.password}</div>
            )}
          </div>

          <div className="button-wrapper">
            <button type="submit" className="submit-button">
              Create
            </button>
          </div>
        </form>
        {errors.form && <div className="error-feedback">{errors.form}</div>}
        {message && <div className="success-feedback">{message}</div>}
        <div className="links">
          <p>already an Artist?</p>
          <Link to="/login">login</Link>
        </div>
      </div>
    </div>
  );
};
