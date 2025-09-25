import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-light text-dark text-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="display-4 fw-bold">Arogya Connect: Healthcare for Every Home</h1>
            <p className="lead my-4">
              Connecting rural communities to quality healthcare through telemedicine.
            </p>
            <Button as={Link} to="/login" variant="primary" size="lg">Get Started</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;