import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookCard from './BookCard';

const categoryNames = [
  "Adventure", "Romance", "Thriller", "Memoir", 
  "Travel", "Health", "Poetry", "Cooking"
];

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const fetchPromises = categoryNames.map(category => 
          fetch(`http://localhost:8000/${category}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => data.map(book => ({ ...book, category })))
        );

        const results = await Promise.all(fetchPromises);
        const allBooks = results.flat();
        setBooks(allBooks);
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
    <Container fluid className="py-5">
      <h1 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>
        Our Book Collection
      </h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4 mx-5">
        {books.map((book) => (
          <Col key={`${book.category}-${book.id}`}>
            <BookCard category={book.category} book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BooksPage;