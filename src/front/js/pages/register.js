import React, { useState } from "react"; // Importing React and useState hook for state management
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation
import { Row, Col, Form, Button } from "react-bootstrap"; // Importing Bootstrap components

export const Register = () => {
  // State hooks for form fields and errors
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Handler for password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // logic to handle user registration here

  };

  return (
    <div className="container">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="signup-form">
            <h2>Create</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Artist Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={!!errors.username}
                  required
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid={!!errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="buttonwrapper">
                <Button variant="dark" type="submit" className="mt-3 my-3">
                  Create
                </Button>
              </div>
            </Form>
            <div>
              <p>
                Already an artist? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
