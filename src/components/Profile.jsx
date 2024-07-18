import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Form } from 'react-bootstrap';


const Profile = () => {
    return (
        <section style={{ backgroundColor: 'white', padding: '20px' }}>
          <Container style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
            <Row>
              <Col lg={4}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                      className="rounded-circle img-fluid" style={{ width: '150px' }} />
                    <h5 className="my-3">John Smith</h5>
                    <p className="text-muted mb-1">Book Enthusiast</p>
                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                    <div className="d-flex justify-content-center mb-2">
                      <Button variant="primary" style={{ backgroundColor: '#E74C3C', borderColor: '#E74C3C' }}>Edit Profile</Button>
                    </div>
                  </Card.Body>
                </Card>
                <Card className="mb-4">
                  <Card.Body>
                    <p className="mb-4"><strong>Reading Statistics</strong></p>
                    <p className="mb-1" style={{ fontSize: '.77rem' }}>Books Read: 42</p>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Reading Goal: 50 books</p>
                    <ProgressBar now={84} label={`${84}%`} className="mb-3" />
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={8}>
                <Card className="mb-4">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col sm={3}>
                        <p className="mb-0">Full Name</p>
                      </Col>
                      <Col sm={9}>
                        <p className="text-muted mb-0">John Smith</p>
                      </Col>
                    </Row>
                    <hr />
                    <Row className="align-items-center">
                      <Col sm={3}>
                        <p className="mb-0">Email</p>
                      </Col>
                      <Col sm={9}>
                        <p className="text-muted mb-0">john.smith@example.com</p>
                      </Col>
                    </Row>
                    <hr />
                    <Row className="align-items-center">
                      <Col sm={3}>
                        <p className="mb-0">Favorite Genre</p>
                      </Col>
                      <Col sm={9}>
                        <p className="text-muted mb-0">Science Fiction</p>
                      </Col>
                    </Row>
                    <hr />
                    <Row className="align-items-center">
                      <Col sm={3}>
                        <p className="mb-0">About Me</p>
                      </Col>
                      <Col sm={9}>
                        <p className="text-muted mb-0">Avid reader and collector of rare first editions. Always on the lookout for the next great story.</p>
                      </Col>
                    </Row>
                    <hr />
                    <Row className="align-items-center">
                      <Col sm={3}>
                        <p className="mb-0">Currently Reading</p>
                      </Col>
                      <Col sm={9}>
                        <p className="text-muted mb-0">"Dune" by Frank Herbert</p>
                      </Col>
                    </Row>
                    <hr />
                    <Row className="align-items-center">
                      <Col sm={3}>
                        <p className="mb-0">Profile Visibility</p>
                      </Col>
                      <Col sm={9}>
                        <Form.Check 
                          type="switch"
                          id="custom-switch"
                          label="Public Profile"
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Card className="mb-4">
                  <Card.Body>
                    <h5>Recent Reviews</h5>
                    <p>"Great book! Couldn't put it down." - on "The Martian"</p>
                    <Button variant="link">View all reviews</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      );
};

export default Profile;