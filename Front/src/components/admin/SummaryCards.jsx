import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaBook, FaUsers } from 'react-icons/fa';
import axios from 'axios';

function SummaryCards() {
  const [summary, setSummary] = useState({
    totalBooks: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin//summary', { withCredentials: true });
        setSummary({
          totalBooks: response.data.totalBooks,
          totalUsers: response.data.totalUsers,
        });
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchSummary();
  }, []);

  const cardData = [
    { title: 'TOTAL BOOKS', value: summary.totalBooks, icon: FaBook },
    { title: 'TOTAL USERS', value: summary.totalUsers, icon: FaUsers },
  ];

  return (
    <Row>
      {cardData.map((card, index) => (
        <Col key={index} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="m-0">{card.title}</Card.Title>
                <card.icon size={24} className="text-primary" />
              </div>
              <Card.Text as="h3" className="mb-0">{card.value}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default SummaryCards;
