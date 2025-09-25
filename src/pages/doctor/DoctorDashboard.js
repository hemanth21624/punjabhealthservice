import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Badge, Alert } from 'react-bootstrap';
import { FaUserMd, FaCalendarDay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/appointments?doctorId=${user.id}`);
        const allAppointments = await response.json();
        const todayAppointments = allAppointments.filter(appt => appt.date === today);
        setAppointments(todayAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user.id, today]);

  if (loading) {
    return <Container className="mt-5 text-center">Loading schedule...</Container>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4"><FaUserMd className="me-2" />Doctor Dashboard</h2>
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4><FaCalendarDay className="me-2" />Today's Appointments</h4>
            <Badge bg="secondary" className="fs-6">{appointments.length}</Badge>
          </div>
          <ListGroup>
            {appointments.length > 0 ? (
              appointments.map(appt => (
                <ListGroup.Item key={appt.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">Patient ID: {appt.patientId}</h5>
                    <p className="mb-1">Time: {appt.time}</p>
                    <small>Notes: {appt.notes}</small>
                  </div>
                  <Link to={`/teleconsultation/${appt.id}`} className="btn btn-primary btn-sm">Start Call</Link>
                </ListGroup.Item>
              ))
            ) : (
              <Alert variant="info" className="text-center">No appointments scheduled for today.</Alert>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;