import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      username: '',
      phone: '',
      address: '',
      country: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    withCredentials: true
                });
                setProfileData(response.data);
                setFormData({
                    username: response.data.username,
                    phone: response.data.phone,
                    address: response.data.address,
                    country: response.data.country
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch profile data');
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/api/auth/profile', formData, {
                withCredentials: true
            });
            setProfileData(response.data);
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!profileData) return <div>No profile data available</div>;

    return (
        <section style={{ backgroundColor: 'white', padding: '20px' }}>
          <Container style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
            <Row>
              <Col lg={4}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <img src="https://via.placeholder.com/150" alt="avatar"
                      className="rounded-circle img-fluid" style={{ width: '150px' }} />
                    <h5 className="my-3">{profileData.username}</h5>
                    <p className="text-muted mb-1">User</p>
                    <p className="text-muted mb-4">{profileData.country}</p>
                    <div className="d-flex justify-content-center mb-2">
                      <Button 
                        variant="primary" 
                        style={{ backgroundColor: '#E74C3C', borderColor: '#E74C3C' }}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={8}>
                {isEditing ? (
                  <Card className="mb-4">
                    <Card.Body>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={3}>Username</Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={3}>Phone</Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={3}>Address</Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={3}>Country</Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Button type="submit" variant="primary">Save Changes</Button>
                      </Form>
                    </Card.Body>
                  </Card>
                ) : (
                  <Card className="mb-4">
                    <Card.Body>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <p className="mb-0">Username</p>
                        </Col>
                        <Col sm={9}>
                          <p className="text-muted mb-0">{profileData.username}</p>
                        </Col>
                      </Row>
                      <hr/>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <p className="mb-0">Email</p>
                        </Col>
                        <Col sm={9}>
                          <p className="text-muted mb-0">{profileData.email}</p>
                        </Col>
                      </Row>
                      <hr/>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <p className="mb-0">Phone</p>
                        </Col>
                        <Col sm={9}>
                          <p className="text-muted mb-0">{profileData.phone}</p>
                        </Col>
                      </Row>
                      <hr/>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <p className="mb-0">Address</p>
                        </Col>
                        <Col sm={9}>
                          <p className="text-muted mb-0">{profileData.address}</p>
                        </Col>
                      </Row>
                      <hr/>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <p className="mb-0">Country</p>
                        </Col>
                        <Col sm={9}>
                          <p className="text-muted mb-0">{profileData.country}</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
          </Container>
        </section>
    );
};

export default Profile;