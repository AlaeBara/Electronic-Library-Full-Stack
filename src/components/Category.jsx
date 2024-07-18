import React from 'react';
import { Card } from 'react-bootstrap';

const Category = ({ name, color, icon }) => (
  <Card 
    className="h-100 shadow-sm" 
    style={{ 
      borderRadius: '15px', 
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: color,
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }}
  >
    <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{icon}</div>
      <Card.Title className="text-center" style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700' }}>{name}</Card.Title>
    </Card.Body>
  </Card>
);

export default Category;