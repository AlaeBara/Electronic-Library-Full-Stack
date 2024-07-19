import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookCard = ({ category, book }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Card
      className={`h-100 shadow-sm ${isClicked ? 'clicked' : ''}`}
      style={{ transition: 'transform 0.3s ease', transform: isClicked ? 'scale(1.15)' : 'scale(1)' }}
      onClick={handleClick}
    >
      <Card.Img
        variant="top"
        src={book.cover}
        alt={book.title}
        style={{ height: '350px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="font-weight-bold">{book.title}</Card.Title>
        <Card.Text className="text-muted mb-auto">Author: {book.author}</Card.Text>
        <Link
          to={`/allbooks/${category}/${book.id}`}
          className="btn btn-primary mt-3"
          style={{ backgroundColor: '#E74C3C', borderColor: '#E74C3C' }}
        >
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BookCard;