import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaHeartbeat, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <Container className="p-4">
        <Row>
          <Col lg={6} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase"><FaHeartbeat className="me-2" />Punjab Health Service</h5>
            <p>
              Your trusted partner for rural healthcare. Bridging the gap between patients and medical professionals.
            </p>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact Us</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <FaPhone className="me-2" /> (123) 456-7890
              </li>
              <li>
                <FaEnvelope className="me-2" /> info@arogyaconnect.com
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3 bg-dark text-white">
        © 2025 Copyright: Punjab Health Service
      </div>
    </footer>
  );
};

export default Footer;