import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic to be added
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
