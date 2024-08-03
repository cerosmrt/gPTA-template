import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

// Retrieve username (email) and password from form inputs.
// Trigger handleSubmit function on form submission.
// Ensure email and password are not empty before sending the request.
// Fetch data from the API endpoint (/api/login) with email and password in the request body.
// On successful login, store the returned token in sessionStorage.
// On failure, display an error message.
// Redirect to the /private route upon successful login.

// `${process.env.BACKEND_URL}/api/login`

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrors({ 
        email: !email ? "Email required" : "", 
        password: !password ? "Password required" : ""
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('token', data.token);
        navigate('/voider');
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.message || "Login failed" });
      }
    } catch {
      setErrors({ form: "An error ocurred. Please try again"});
    }
  };

  return (
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
            />
            {errors.email && <div className="error-feedback">{errors.email}</div>}
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
            {errors.password && <div className="error-feedback">{errors.password}</div>}
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
