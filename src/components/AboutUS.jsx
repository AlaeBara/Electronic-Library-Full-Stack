import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import brickworkImage from '../assets/images/brickwork-covers-top.jpg';

const AboutUs = () => {
  return (
    <Container fluid className="p-0 overflow-hidden">
      <Row noGutters>
        <Col className="p-0">
          <Image 
            src={brickworkImage} 
            alt="Brickwork" 
            className="w-100" 
            fluid 
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 mx-0">
        <Col xs={12} md={8} lg={6} className="text-center">
          <h1 style={{ fontSize: '3.5rem' }}>About Our Library</h1>
          <p className="mt-3" style={{ fontSize: '1.5rem' }}>Welcome to our library! We are dedicated to providing a vast collection of resources and a comfortable space for all your reading and research needs. Explore our diverse collection and enjoy a quiet place to immerse yourself in the world of books.</p>
          <Button variant="danger" className="mt-3 mb-5 px-4 py-2" size="lg">
            Explore Our Books
          </Button>
        </Col>
      </Row>
      <Row>
      <Col className="p-0">
          <Image 
            src={brickworkImage} 
            alt="Brickwork" 
            className="w-100" 
            fluid 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;