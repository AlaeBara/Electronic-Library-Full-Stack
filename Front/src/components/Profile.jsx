import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [userBooks, setUserBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        address: '',
        country: '',
        profileImage: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await axios.get('http://localhost:5000/api/auth/profile', {
                    withCredentials: true
                });
                setProfileData(profileResponse.data);
                setFormData({
                    username: profileResponse.data.username,
                    phone: profileResponse.data.phone,
                    address: profileResponse.data.address,
                    country: profileResponse.data.country,
                    profileImage: profileResponse.data.profileImage || ''
                });

                const booksResponse = await axios.get('http://localhost:5000/api/user-books', {
                    withCredentials: true
                });
                setUserBooks(booksResponse.data);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch profile data or user books');
                setLoading(false);
            }
        };

        fetchData();
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'y1f5bwss');

        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/djux9krem/image/upload', formData);
            setFormData(prevState => ({ ...prevState, profileImage: res.data.secure_url }));
        } catch (err) {
            console.error('Error uploading image: ', err);
        }
    };

    const handleDeleteClick = (book) => {
        setBookToDelete(book);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${bookToDelete._id}`, {
                withCredentials: true
            });
            setUserBooks(userBooks.filter(book => book._id !== bookToDelete._id));
            setShowDeleteModal(false);
        } catch (err) {
            console.error('Error deleting book:', err);
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
                                {profileData.profileImage ? (
                                    <img src={profileData.profileImage} alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                ) : (
                                    <img src="https://via.placeholder.com/150" alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                )}
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
                                            <Form.Label column sm={3}>Profile Image</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    type="file"
                                                    onChange={handleImageUpload}
                                                />
                                            </Col>
                                        </Form.Group>
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
                <Row className="mt-5">
                    <Col>
                        <h2>Your Uploaded Books</h2>
                        {userBooks.length === 0 ? (
                            <p>You haven't uploaded any books yet.</p>
                        ) : (
                            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                                {userBooks.map((book) => (
                                    <Col key={book._id}>
                                        <Card>
                                            <div className="position-relative">
                                                <Card.Img variant="top" src={book.cover} />
                                                <Button 
                                                    variant="danger"
                                                    size="sm"
                                                    className="position-absolute top-0 end-0 m-2"
                                                    onClick={() => handleDeleteClick(book)}
                                                >
                                                    X
                                                </Button>
                                            </div>
                                            <Card.Body>
                                                <Card.Title>{book.title}</Card.Title>
                                                <Card.Text>{book.author}</Card.Text>
                                                <Button 
                                                    variant="primary" 
                                                    href={`/allbooks/${book.category}/${book._id}`}
                                                    style={{ backgroundColor: '#E74C3C', borderColor: '#E74C3C' }}
                                                >
                                                    View Details
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete "{bookToDelete?.title}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default Profile;