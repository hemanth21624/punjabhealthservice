import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CustomCard from '../../components/Card';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, appointmentsRes] = await Promise.all([
          fetch('http://localhost:5000/users'),
          fetch('http://localhost:5000/appointments')
        ]);
        const users = await usersRes.json();
        const appointments = await appointmentsRes.json();
        setData({ users, appointments });
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Container className="mt-5 text-center">Loading analytics...</Container>;
  }

  if (error) {
    return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  // Sample data for charts
  const patientCount = data.users.filter(u => u.role === 'patient').length;
  const doctorCount = data.users.filter(u => u.role === 'doctor').length;
  const appointmentsCount = data.appointments.length;

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Appointments',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#007bff',
      backgroundColor: '#007bff',
    }]
  };

  const barChartData = {
    labels: ['Doctors', 'Patients', 'Appointments'],
    datasets: [{
      label: 'Counts',
      data: [doctorCount, patientCount, appointmentsCount],
      backgroundColor: ['#28a745', '#17a2b8', '#ffc107'],
    }]
  };

  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4">Admin Dashboard</h2>
      <Row>
        <Col md={4}>
          <CustomCard title="Total Users">
            <h1 className="display-4">{data.users.length}</h1>
            <p className="text-muted">Total registered users on the platform.</p>
          </CustomCard>
        </Col>
        <Col md={4}>
          <CustomCard title="Total Doctors">
            <h1 className="display-4">{doctorCount}</h1>
            <p className="text-muted">Currently serving on the platform.</p>
          </CustomCard>
        </Col>
        <Col md={4}>
          <CustomCard title="Total Appointments">
            <h1 className="display-4">{appointmentsCount}</h1>
            <p className="text-muted">Appointments booked to date.</p>
          </CustomCard>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <CustomCard title="Appointment Trend (Last 6 months)">
            <Line data={lineChartData} />
          </CustomCard>
        </Col>
        <Col md={6}>
          <CustomCard title="Platform Overview">
            <Bar data={barChartData} />
          </CustomCard>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <CustomCard title="Management">
            <Button as={Link} to="/user-management" variant="primary" className="me-2"><FaUsers /> Manage Users</Button>
          </CustomCard>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;