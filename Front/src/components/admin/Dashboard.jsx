import React from 'react';
import SummaryCards from './SummaryCards';
import Usermanagement from './Usermanagement';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container fluid className="dashboard p-4">
      <h1>Admin Dashboard</h1>
      <SummaryCards />
      <Row className="mt-4">
        <Col>
          <Usermanagement />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;