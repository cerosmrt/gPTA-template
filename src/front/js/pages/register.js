import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // logic to handle user registration here
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
        <div className="links">
          <p>
            Already an artist? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
