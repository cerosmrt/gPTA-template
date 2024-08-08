import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles from "../../styles/forgot.css";

export function Forgot() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // logic to handle the password reset request here
    // This usually involves calling an API that handles the password reset process
    console.log("Password reset request for:", email);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-form">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={email ? "" : "invalid"}
              required
            />
            {!email && <div className="error-feedback">Email is required</div>}
          </div>
          <div className="button-wrapper">
            <button type="submit" className="submit-button">
              Request Password Reset
            </button>
          </div>
        </form>
        <div className="links">
          <button onClick={() => navigate("/")} className="home-button">
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
