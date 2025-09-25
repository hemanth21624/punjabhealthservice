import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ doctorId: '', date: '', notes: '' });
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/doctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAppointment = {
        patientId: user.id,
        doctorId: parseInt(formData.doctorId),
        date: formData.date,
        time: "10:00 AM", // Placeholder time
        status: "Scheduled",
        notes: formData.notes
      };
      
      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment)
      });

      if (response.ok) {
        setAlert({ show: true, message: 'Appointment booked successfully!', variant: 'success' });
        setTimeout(() => {
          navigate('/patient-dashboard');
        }, 2000);
      } else {
        throw new Error('Failed to book appointment.');
      }
    } catch (error) {
      setAlert({ show: true, message: 'Failed to book appointment. Please try again.', variant: 'danger' });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-primary">Book an Appointment</h2>
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="doctorId">
              <Form.Label>Select a Doctor</Form.Label>
              <Form.Control as="select" name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                <option value="">Choose...</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Symptoms/Notes</Form.Label>
              <Form.Control as="textarea" rows={3} name="notes" value={formData.notes} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Book Now
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookAppointment;