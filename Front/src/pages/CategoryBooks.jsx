import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';



const CategoryBooks = () => {
  const { categoryName } = useParams();
  
  // Find the matching category key, ignoring case
  


  return (
    <Container fluid className="py-5">
      <h1 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>
        Books in {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4 mx-4">
        
      </Row>
    </Container>
  );
};

export default CategoryBooks;