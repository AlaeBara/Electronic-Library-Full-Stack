import React, { useState, useContext } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import '../assets/css/navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/logowa.png';
import { AuthContext } from '../AuthContext';
import axios from 'axios'

const CustomNavbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear the search input after searching
    }
  };

  const handleLogout = async() => {
        try {
          await axios.get('http://localhost:5000/api/auth/logout',{withCredentials:true});
          setIsLoggedIn(false);
          localStorage.removeItem('token');
          navigate('/'); 
        } catch (error) {
          console.error('Logout failed:', error);
          alert("Logout failed");
        }
  };

  return (
    <Navbar expand="lg" className="sticky-top navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="lmochkila navbar-center">
            <Form className="d-flex search-form" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search Anything...."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
              <Button type="submit" className="search-button">
                <i className="fas fa-search"></i> Search
              </Button>
            </Form>
          </div>
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
}

export default CustomNavbar;