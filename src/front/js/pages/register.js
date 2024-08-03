import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("");

    if (!email || !username || !password) {
      setErrors({ form: "All fields are required" });
      return;
    }

    console.log("Backend URL:", process.env.BACKEND_URL); // Debugging line

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name: username, password }),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        setTimeout(() => {
          history("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.msg || "Registration failed" });
      }
    } catch (error) {
      console.error("Error:", error); // Debugging line
      setErrors({ form: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="register-container">
      <div className="signup-form">
        <h2>Create</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Artist Name</label>
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
            {errors.username && <div className="error-feedback">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "invalid" : ""}
              required
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
              onChange={handlePasswordChange}
              className={errors.password ? "invalid" : ""}
              required
            />
            {errors.password && <div className="error-feedback">{errors.password}</div>}
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
          <p>
            Already an artist? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};