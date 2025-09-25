import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Alert, Badge } from 'react-bootstrap';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch user data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <Container className="mt-5 text-center">Loading users...</Container>;
  }

  if (error) {
    return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return <Badge bg="danger">Admin</Badge>;
      case 'doctor': return <Badge bg="success">Doctor</Badge>;
      case 'patient': return <Badge bg="info">Patient</Badge>;
      case 'nurse': return <Badge bg="warning">Nurse</Badge>;
      default: return <Badge bg="secondary">{role}</Badge>;
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4">User Management</h2>
      <Row>
        <Col>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{getRoleBadge(user.role)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagement;