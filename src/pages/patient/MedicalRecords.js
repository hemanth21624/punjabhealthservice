import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Accordion, Alert, Button } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';

const MedicalRecords = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/patients?userId=${user.id}`);
        const data = await response.json();
        setPatientData(data[0]);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, [user.id]);

  if (loading) {
    return <Container className="mt-5 text-center">Loading records...</Container>;
  }

  if (!patientData) {
    return <Container className="mt-5"><Alert variant="danger">Records not found.</Alert></Container>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-primary">My Medical Records</h2>
          <p>Access your digital health history, prescriptions, and reports.</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Prescriptions</Accordion.Header>
                  <Accordion.Body>
                    {patientData.prescriptions && patientData.prescriptions.length > 0 ? (
                      patientData.prescriptions.map((p, index) => (
                        <div key={index} className="mb-3 p-3 border rounded">
                          <strong>Date:</strong> {p.date} <br/>
                          <strong>Doctor:</strong> {p.doctor}
                          <h6 className="mt-2">Medications:</h6>
                          <ul>
                            {p.medications.map((med, i) => (
                              <li key={i}>{med.name} - {med.dosage} ({med.instructions})</li>
                            ))}
                          </ul>
                          <Button variant="outline-secondary" size="sm" className="mt-2"><FaDownload /> Download</Button>
                        </div>
                      ))
                    ) : (
                      <Alert variant="info">No prescriptions on record.</Alert>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicalRecords;