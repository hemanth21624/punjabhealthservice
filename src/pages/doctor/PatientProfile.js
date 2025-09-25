import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Accordion, ListGroup, Alert, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaUserCircle, FaHistory, FaNotesMedical, FaPills } from 'react-icons/fa';

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPrescription, setNewPrescription] = useState({ medication: '', dosage: '', instructions: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/patients/${id}`);
        if (!response.ok) {
          throw new Error('Patient profile not found.');
        }
        const data = await response.json();
        setPatient(data);
      } catch (err) {
        setError(err.message || 'Error fetching patient data.');
        console.error("Error fetching patient data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, [id]);

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    if (!newPrescription.medication || !newPrescription.dosage) {
      alert("Please fill in medication and dosage.");
      return;
    }
    
    const doctor = JSON.parse(localStorage.getItem('user'));
    
    const updatedPrescriptions = [...(patient.prescriptions || []), {
      id: Date.now(),
      doctor: doctor.name,
      date: new Date().toISOString().slice(0, 10),
      medications: [{ 
        name: newPrescription.medication, 
        dosage: newPrescription.dosage, 
        instructions: newPrescription.instructions 
      }]
    }];

    try {
      const response = await fetch(`http://localhost:5000/patients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prescriptions: updatedPrescriptions })
      });
      
      if (response.ok) {
        setPatient({ ...patient, prescriptions: updatedPrescriptions });
        setNewPrescription({ medication: '', dosage: '', instructions: '' });
        alert("Prescription added successfully!");
      } else {
        throw new Error('Failed to update patient data.');
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add prescription.");
    }
  };

  if (loading) {
    return <Container className="mt-5 text-center">Loading patient profile...</Container>;
  }

  if (error) {
    return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  if (!patient) {
    return <Container className="mt-5"><Alert variant="info">Patient profile not found.</Alert></Container>;
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary"><FaUserCircle className="me-2" />Patient Profile: {patient.name}</h2>
          <p className="text-muted">ID: {patient.id} | Age: {patient.age} | Gender: {patient.gender}</p>
        </Col>
      </Row>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header><FaHistory className="me-2" />Medical History</Accordion.Header>
          <Accordion.Body>
            <Card>
              <Card.Body>
                <Card.Text><strong>Medical History:</strong> {patient.medicalHistory}</Card.Text>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header><FaPills className="me-2" />Prescriptions</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              {patient.prescriptions && patient.prescriptions.length > 0 ? (
                patient.prescriptions.map((p, index) => (
                  <ListGroup.Item key={index}>
                    <strong>Date:</strong> {p.date} <br/>
                    <strong>Doctor:</strong> {p.doctor}
                    <h6 className="mt-2">Medications:</h6>
                    <ListGroup variant="flush">
                      {p.medications.map((med, i) => (
                        <ListGroup.Item key={i}>
                          {med.name} - {med.dosage} ({med.instructions})
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </ListGroup.Item>
                ))
              ) : (
                <Alert variant="info">No prescriptions on record.</Alert>
              )}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Card className="mt-4">
        <Card.Body>
          <h4 className="text-primary"><FaNotesMedical className="me-2" />Add New Prescription</h4>
          <Form onSubmit={handlePrescriptionSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Medication Name</Form.Label>
              <Form.Control type="text" name="medication" value={newPrescription.medication} onChange={handlePrescriptionChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dosage</Form.Label>
              <Form.Control type="text" name="dosage" value={newPrescription.dosage} onChange={handlePrescriptionChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instructions</Form.Label>
              <Form.Control as="textarea" rows={3} name="instructions" value={newPrescription.instructions} onChange={handlePrescriptionChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Add Prescription</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientProfile;