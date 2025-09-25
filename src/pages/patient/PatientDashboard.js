import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomCard from '../../components/Card';
import { FaUserCircle, FaStethoscope, FaCalendarAlt, FaHistory } from 'react-icons/fa';

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/patients?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient data.');
        }
        const data = await response.json();
        setPatientData(data[0]);
      } catch (err) {
        setError(err.message || 'Error fetching patient data.');
        console.error("Error fetching patient data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchPatientData();
    }
  }, [user]);

  if (loading) {
    return <Container className="mt-5 text-center">Loading...</Container>;
  }

  if (error) {
    return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  if (!patientData) {
    return <Container className="mt-5"><Alert variant="info">Patient data not found. Please log in again.</Alert></Container>;
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary"><FaUserCircle className="me-2" />Welcome, {patientData.name}!</h2>
          <p>This is your personalized healthcare dashboard.</p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <CustomCard title="Upcoming Appointments">
            <ListGroup variant="flush">
              {patientData.appointments && patientData.appointments.length > 0 ? (
                patientData.appointments.map(appt => (
                  <ListGroup.Item key={appt.id}>
                    <strong>Date:</strong> {appt.date} <br/>
                    <strong>Doctor:</strong> {appt.doctor} <br/>
                    <strong>Status:</strong> {appt.status}
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No upcoming appointments.</ListGroup.Item>
              )}
            </ListGroup>
          </CustomCard>
        </Col>
        <Col md={6}>
          <CustomCard title="Quick Actions">
            <div className="d-grid gap-2">
              <Button as={Link} to="/book-appointment" variant="outline-primary"><FaCalendarAlt className="me-2" />Book New Appointment</Button>
              <Button as={Link} to="/medical-records" variant="outline-primary"><FaHistory className="me-2" />View My Records</Button>
              <Button as={Link} to="/symptom-checker" variant="outline-primary"><FaStethoscope className="me-2" />Symptom Checker</Button>
            </div>
          </CustomCard>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDashboard;