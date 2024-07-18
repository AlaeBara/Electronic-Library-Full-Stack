import React from 'react';
import '../assets/css/footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import logo from '../assets/images/logowacopy.png'

const Footer = () => {
    return (
        <footer className="footer backg text-light py-4">
            <Container>
                <Row className="footer-content">
                    <Col xs={12} md={4} className="footer-logo mb-3 mb-md-0">
                        <a href="/">
                            <img src={logo} alt='logo' className='img-fluid' style={{ maxWidth: "130px"}}/>
                        </a>
                    </Col>
                    <Col xs={12} md={4} className="footer-links mb-3 mb-md-0">
                        <ul className="list-unstyled">
                            <li><a href="/Privacy" className='text-decoration-none text-white'>Privacy policy</a></li>
                            <li><a href="/terms" className='text-decoration-none text-white'>Terms of Service</a></li>
                            <li><a href="/aboutus" className='text-decoration-none text-white'>About us</a></li>
                            <li><a href="/contactus" className='text-decoration-none text-white'>Contact us</a></li>
                        </ul>
                    </Col>
                    <Col xs={12} md={4} className="footer-social">
                        <ul className="list-unstyled footer-icons">
                            <li>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='text-white'><FaInstagram size={30} /></a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='text-white'><AiOutlineFacebook size={30} /></a>
                            </li>
                            <li>
                                <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer" className='text-white'><FaTwitter size={30} /></a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;