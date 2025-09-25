import React from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { FaUserPlus, FaNotesMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NurseDashboard = () => {

  // Placeholder for a list of patients to check in
  const patientsToCheckIn = [
    { id: 1, name: 'Hemanth Kumar', appointmentTime: '10:30 AM' },
    { id: 2, name: 'Priya Singh', appointmentTime: '11:00 AM' }
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4">Nurse Dashboard</h2>
      <Row>
        <Col md={6}>
          <h4>Patients to Check In</h4>
          <ListGroup className="mt-3">
            {patientsToCheckIn.length > 0 ? (
              patientsToCheckIn.map(patient => (
                <ListGroup.Item key={patient.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{patient.name}</h5>
                    <small>Appointment: {patient.appointmentTime}</small>
                  </div>
                  <Button as={Link} to="/vitals-entry" variant="outline-primary" size="sm">Enter Vitals</Button>
                </ListGroup.Item>
              ))
            ) : (
              <p>No patients to check in.</p>
            )}
          </ListGroup>
        </Col>
        <Col md={6}>
          <h4>Quick Actions</h4>
          <div className="d-grid gap-2 mt-3">
            <Button as={Link} to="/vitals-entry" variant="primary"><FaNotesMedical className="me-2" />Add Vitals for a Patient</Button>
            <Button variant="outline-primary"><FaUserPlus className="me-2" />Register New Patient</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NurseDashboard;