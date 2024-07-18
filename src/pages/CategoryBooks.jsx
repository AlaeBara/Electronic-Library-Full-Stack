import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import BooksData from '../books.json';

const CategoryBooks = () => {
  const { categoryName } = useParams();
  
  // Find the matching category key, ignoring case
  const matchingCategory = Object.keys(BooksData).find(
    category => category.toLowerCase() === categoryName.toLowerCase()
  );

  const books = matchingCategory ? BooksData[matchingCategory] : [];

  return (
    <Container fluid className="py-5">
      <h1 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>
        Books in {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4 mx-4">
        {books.length > 0 ? (
          books.map((book) => (
            <Col key={book.id}>
              <BookCard category={matchingCategory} book={book} />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center" style={{ color: '#666' }}>No books available in this category.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CategoryBooks;