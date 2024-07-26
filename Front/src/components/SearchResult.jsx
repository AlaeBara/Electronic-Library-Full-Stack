import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import BookCard from './BookCard';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
        setSearchResults(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
        setError("Failed to load search results. Please try again later.");
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container fluid className="py-5">
      <h1 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>
        Search Results for "{query}"
      </h1>
      {searchResults.length === 0 ? (
        <Alert variant="info">No books found matching your search.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4 mx-5">
          {searchResults.map((book) => (
            <Col key={book._id}>
              <BookCard category={book.category} book={book} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;