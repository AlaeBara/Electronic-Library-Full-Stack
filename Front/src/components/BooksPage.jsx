import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookCard from './BookCard';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container fluid className="py-4">
      <h1 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>
        Available Books
      </h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4 mx-5">
        {books.map((book) => (
          <Col key={book._id}>
            <BookCard category={book.category} book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BooksPage;
