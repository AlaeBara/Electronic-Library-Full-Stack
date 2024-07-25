import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BookCard from './BookCard';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  return (
    <Container fluid className="py-5">
      <h1 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>
        Search Results for "{query}"
      </h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4 mx-5">
      </Row>
    </Container>
  );
};

export default SearchResults;