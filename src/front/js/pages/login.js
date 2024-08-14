import React, { useState } from "react"; // Import the useState hook.
import { Link, useNavigate } from "react-router-dom"; // Import the Link and useNavigate components from react-router-dom.
import "../../styles/login.css";

// Retrieve username (email) and password from form inputs.
// Trigger handleSubmit function on form submission.
// Ensure email and password are not empty before sending the request.
// Fetch data from the API endpoint (/api/login) with email and password in the request body.
// On successful login, store the returned token in localStorage.
// On failure, display an error message.
// Redirect to the /private route upon successful login.

// `${process.env.BACKEND_URL}/api/login`

export const Login = () => {
  // Create a Login component.
  const [email, setEmail] = useState(""); // Create a state variable email and a function setEmail to update it.
  const [password, setPassword] = useState(""); // Create a state variable password and a function setPassword to update it.
  const [errors, setErrors] = useState({}); // Create a state variable errors and a function setErrors to update it.
  const navigate = useNavigate(); // Create a navigate function using the useNavigate hook.

  const handleSubmit = async (e) => {
    // Create a handleSubmit function.
    e.preventDefault(); // Prevent the default form submission behavior.
    if (!email || !password) {
      // Check if email or password are empty.
      setErrors({
        // Update the errors state variable.
        email: !email ? "Email required" : "", // Set the email error message if email is empty.
        password: !password ? "Password required" : "", // Set the password error message if password is empty.
      }); // End the setErrors function.
      return; // Exit the function.
    } // End the if statement.

    try {
      // Try to execute the following code.
      const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        // Fetch the login API endpoint.
        method: "POST", // Use the POST method.
        headers: {
          // Set the request headers.
          "Content-Type": "application/json", // Set the content type to JSON.
        }, // End the headers.
        body: JSON.stringify({ email, password }), // Set the request body to the email and password.
      }); // End the fetch function.

      if (response.ok) {
        // Check if the response is OK.
        const data = await response.json(); // Parse the response data.
        console.log("Response Data:", data); // Debugging line.
        localStorage.setItem("token", data.token); // Store the token in the localStorage.
        // localStorage.setItem("name", data.name); // Store the name in the localStorage.
        localStorage.setItem("artist_id", data.artist_id); // Store the name in the localStorage.
        console.log("Token:", data.token); // Debugging line.
        // console.log("Artist Name:", data.name); // Debugging line.
        console.log("Artist ID:", data.artist_id); // Debugging line.
        navigate("/voider"); // Redirect to the /voider route.
      } else {
        // If the response is not OK.
        const errorData = await response.json(); // Parse the error data.
        setErrors({ form: errorData.message || "Login failed" }); // Set the error message.
      } // End the if statement.
    } catch {
      // Catch any errors.
      setErrors({ form: "An error ocurred. Please try again" }); // Set the error message.
    } // End the try-catch block.
  }; // End the handleSubmit function.

  return (
    // Return the following content.
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "invalid" : ""}
              autoFocus
            />{" "}
            {errors.email && (
              <div className="error-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "invalid" : ""}
            />
            {errors.password && (
              <div className="error-feedback">{errors.password}</div>
            )}
          </div>
          <div className="button-wrapper">
            <button type="submit" className="submit-button">
              Login
            </button>
          </div>
        </form>
        <div className="links">
          <Link to="/forgot">Recover password</Link>
        </div>
        <div className="links">
          <p>
            Not an artist yet? <Link to="/register">Create</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
