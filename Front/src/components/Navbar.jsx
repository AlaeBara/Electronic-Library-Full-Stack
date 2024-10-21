import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/logowa.png';
import axios from 'axios';
import '../assets/css/navbar.css';

const CustomNavbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    }
  };

  return (
    <Navbar expand="lg" className="sticky-top navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Form className="search-form" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search Anything..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
              <Button type="submit" className="search-button">
                <i className="fas fa-search"></i> Search
              </Button>
            </Form>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/favorites" className="navbar-link-custom">Favorite</Nav.Link>
                <Nav.Link as={Link} to="/addbook" className="navbar-link-custom">Add Book</Nav.Link>
                <Nav.Link as={Link} to="/profile" className="navbar-link-custom">Profile</Nav.Link>
                <Nav.Link onClick={handleLogout} className="logina navbar-link-custom px-3">Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="logina navbar-link-custom px-3">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
