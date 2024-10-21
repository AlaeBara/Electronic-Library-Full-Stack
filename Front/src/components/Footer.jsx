import React from 'react';
import '../assets/css/footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import logo from '../assets/images/logowacopy.png'

const Footer = () => {
    return (
        <footer className="footer backg text-light py-5">
            <Container>
                <Row className="footer-content align-items-center">
                    <Col xs={12} md={4} className="footer-logo mb-4 mb-md-0">
                        <a href="/">
                            <img src={logo} alt='logo' className='img-fluid' style={{ maxWidth: "130px"}}/>
                        </a>
                    </Col>
                    <Col xs={12} md={4} className="footer-links mb-4 mb-md-0">
                        <ul className="list-unstyled">
                            {[
                                { href: "/privacy", text: "Privacy Policy" },
                                { href: "/terms", text: "Terms of Service" },
                                { href: "/aboutus", text: "About Us" },
                                { href: "/contactus", text: "Contact Us" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className='text-decoration-none text-white hover-effect'>
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col xs={12} md={4} className="footer-social">
                        <ul className="list-unstyled footer-icons d-flex justify-content-center">
                            {[
                                { Icon: FaInstagram, href: "https://www.instagram.com/" },
                                { Icon: FaFacebook, href: "https://www.facebook.com/" },
                                { Icon: FaTwitter, href: "https://twitter.com/" },
                            ].map(({ Icon, href }) => (
                                <li key={href} className="mx-2">
                                    <a href={href} target="_blank" rel="noopener noreferrer" className='text-white social-icon-link'>
                                        <Icon size={30} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Alaeddine & Abdennacer .All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;