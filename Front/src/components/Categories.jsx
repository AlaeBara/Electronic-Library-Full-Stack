import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Category from './Category';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const categoryNames = [
  "Adventure", "Romance", "Thriller", "Memoir", 
  "Travel", "Health", "Poetry", "Cooking"
];

const categoryIcons = {
  "Adventure": "🚀",
  "Romance": "💖",
  "Thriller": "🔪",
  "Memoir": "📖",
  "Travel": "🌍",
  "Health": "🍏",
  "Poetry": "📝",
  "Cooking": "🍴"
};

const Allcategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchPromises = categoryNames.map(name => 
          fetch(`http://localhost:8000/${name}`)
            .then(response => response.json())
            .then(data => ({
              name: name,
              color: "#2B3A42",
              icon: categoryIcons[name] || "📚",
            }))
        );
        const results = await Promise.all(fetchPromises);
        setCategories(results);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <h1 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>
        Explore Our Book Categories
      </h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 mx-5">
        {categories.map((category) => (
          <Col key={category.name}>
            <Link to={`/allbooks/${category.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
              <Category {...category} />
            </Link>
          </Col>
        ))}
      </Row>
      <Row className="mt-5">
        <Col className="text-center">
          <Link to="/allbooks">
            <Button style={{ backgroundColor: "#E74C3C", border: "none" }} variant="primary" size="lg">
              Explore All Books
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Allcategories;