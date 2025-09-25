import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const VitalsEntry = () => {
  const [formData, setFormData] = useState({ patientId: '', temperature: '', bp: '', heartRate: '' });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to the backend.
    console.log("Vitals Submitted:", formData);
    setAlert({ message: 'Vitals submitted successfully!', variant: 'success' });
    setFormData({ patientId: '', temperature: '', bp: '', heartRate: '' }); // Clear form
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-primary">Vitals Entry</h2>
          {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="patientId">
              <Form.Label>Patient ID</Form.Label>
              <Form.Control type="text" name="patientId" value={formData.patientId} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="temperature">
              <Form.Label>Temperature (°F)</Form.Label>
              <Form.Control type="number" name="temperature" value={formData.temperature} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bp">
              <Form.Label>Blood Pressure (mmHg)</Form.Label>
              <Form.Control type="text" name="bp" value={formData.bp} onChange={handleChange} placeholder="e.g., 120/80" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="heartRate">
              <Form.Label>Heart Rate (bpm)</Form.Label>
              <Form.Control type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Submit Vitals</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VitalsEntry;