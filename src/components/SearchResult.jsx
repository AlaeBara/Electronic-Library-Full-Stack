import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BookCard from './BookCard';
import BooksData from '../books.json';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  const filteredBooks = Object.entries(BooksData).flatMap(([category, books]) => 
    books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    ).map(book => ({ ...book, category }))
  );

  return (
    <Container fluid className="py-5">
      <h1 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>
        Search Results for "{query}"
      </h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4 mx-5">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Col key={`${book.category}-${book.id}`}>
              <BookCard category={book.category} book={book} />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center" style={{ color: '#666' }}>No books found matching your search.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SearchResults;