import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Col xs={12} md={8} lg={6} className="text-center">
          <h1 style={{ fontSize: '6rem', color: '#333' }}>404</h1>
          <h2 className="mb-4" style={{ color: '#666' }}>Oops! Page Not Found</h2>
          <p className="mb-4" style={{ color: '#888' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Go Back to Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;