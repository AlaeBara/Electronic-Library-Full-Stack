import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import logowa from "../assets/images/logowa.png";
import "../assets/css/Login.css";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`Username: ${inputUsername}, Password: ${inputPassword}`);
    setLoading(false);

    // Example sign-in logic
    if (inputUsername !== "admin" || inputPassword !== "admin") {
      setShow(true);
    } else {
      setShow(false);
      // Redirect to dashboard or home page
    }
  };

  return (
    <Container fluid className="mt-5 d-flex justify-content-center align-items-center login-container">
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <div className="bg-white p-4 p-md-5 rounded shadow login-form">
            <img src={logowa} alt="logo" className="img-fluid mx-auto d-block mb-4 login-logo" />
            <h2 className="text-center mb-4 login-title">Sign In</h2>
            {show && (
              <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                Incorrect username or password.
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={inputUsername}
                  placeholder="Enter your username"
                  onChange={(e) => setInputUsername(e.target.value)}
                  required
                  className="login-input"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={inputPassword}
                  placeholder="Enter your password"
                  onChange={(e) => setInputPassword(e.target.value)}
                  required
                  className="login-input"
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 login-button" 
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;