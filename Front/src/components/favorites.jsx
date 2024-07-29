import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import BookCard from './BookCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (bookId) => {
    const updatedFavorites = favorites.filter(book => book._id !== bookId);
    console.log('Updated favorites:', updatedFavorites);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Container fluid className="py-5">
      <h1 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>
        Your Favorite Books
      </h1>
      {favorites.length === 0 ? (
        <Alert variant="info">You haven't added any books to your favorites yet.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4 mx-5">
          {favorites.map((book) => (
            <Col key={`${book.category}-${book.id}`}>
              <div className="position-relative">
                <BookCard category={book.category} book={book} />
                <button
                  className="btn btn-danger position-absolute top-0 end-0 m-2"
                  onClick={() => removeFavorite(book._id)}
                >
                  Remove
                </button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;