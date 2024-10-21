import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Book, Heart, X } from 'lucide-react'; // Import icons if you have lucide-react
import '../assets/css/bookbtn.css';

const OneBook = () => {
  const openPdf = () => {
    if (book.pdfUrl) {
      window.open(book.pdfUrl, '_blank');
    } else {
      alert('PDF not available for this book.');
    }
    handleCloseModal();
  };
  
  const { category, bookId } = useParams();
  const [isImageLarge, setIsImageLarge] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav._id === book._id)) {
      favorites.push(book);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Book added to favorites!');
    } else {
      alert('This book is already in your favorites!');
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${category}/${bookId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Could not fetch book:", error);
        setError('Failed to load book. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [category, bookId]);

  const handleImageClick = () => {
    setIsImageLarge(!isImageLarge);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
      <Container className="py-5">
        <Row className="g-4">
          {/* Left Column - Book Image and Buttons */}
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <div 
                onClick={handleImageClick} 
                className="position-relative" 
                style={{ cursor: 'pointer', overflow: 'hidden' }}
              >
                <Card.Img
                  variant="top"
                  src={book.cover}
                  alt={book.title}
                  className="hover-zoom"
                  style={{
                    height: '500px',
                    objectFit: 'contain',
                    width: '100%',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div className="image-overlay">
                  <span className="click-to-zoom">Click to zoom</span>
                </div>
              </div>
            </Card>
            <div className="d-grid mt-4">
              <Button 
                className="read-book-btn py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
                onClick={handleShowModal}
                style={{
                  backgroundColor: '#2ecc71',
                  border: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#27ae60';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#2ecc71';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Book size={20} /> Read This Book
              </Button>
              <Button 
                className="add-to-favorites-btn py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
                onClick={addToFavorites}
                style={{
                  backgroundColor: '#e74c3c',
                  border: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#c0392b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#e74c3c';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Heart size={20} /> Add To Favorite
              </Button>
            </div>
          </Col>
  
          {/* Right Column - Book Details */}
          <Col md={8}>
            <div className="p-4">
              <h1 className="display-5 mb-3 fw-bold">{book.title}</h1>
              <h4 className="text-muted mb-4">by {book.author}</h4>
              <div className="mb-4">
                <h5 className="text-dark mb-3">Description:</h5>
                <p className="lead text-secondary">{book.description}</p>
              </div>
              <div className="mt-4">
                <div className="d-flex gap-3 flex-wrap">
                  <span className="badge bg-primary p-2">Category: {category}</span>
                  {/* Add more badges for additional book metadata if available */}
                </div>
              </div>
            </div>
          </Col>
        </Row>
  
        {/* Enhanced Modal */}
        <Modal 
          show={showModal} 
          onHide={handleCloseModal}
          centered
          className="book-modal"
        >
          <Modal.Header className="border-0 pb-0 d-flex justify-content-between align-items-center">
            <Modal.Title className="text-primary">Open The Book</Modal.Title>
            <Button 
              variant="link" 
              onClick={handleCloseModal}
              className="p-0 text-dark"
            >
              <X size={24} />
            </Button>
          </Modal.Header>

          <Modal.Body className="text-center py-4">
            <p className="mb-0">Click Yes To View "{book.title}" Content</p>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button 
              variant="outline-secondary" 
              onClick={handleCloseModal}
              className="px-4"
            >
              Cancel
            </Button>
            <Button 
              variant="success" 
              onClick={openPdf}
              className="px-4"
            >
              YES
            </Button>
          </Modal.Footer>
        </Modal>
  
        {/* Enhanced Image Overlay */}
        {isImageLarge && (
          <div
            onClick={handleImageClick}
            className="image-overlay-container"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 1000,
            }}
          >
            <Button 
              className="position-absolute top-4 end-4 bg-transparent border-0"
              onClick={handleImageClick}
            >
              <X size={24} color="white" />
            </Button>
            <img
              src={book.cover}
              alt={book.title}
              style={{
                maxHeight: '90vh',
                maxWidth: '90vw',
                objectFit: 'contain',
                transition: 'transform 0.3s ease',
              }}
            />
          </div>
        )}
      </Container>
    );
  };
  
  export default OneBook;