import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error('Server connection failed. Please ensure json-server is running.');
      }
      const users = await response.json();
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        switch (user.role) {
          case 'patient':
            navigate('/patient-dashboard');
            break;
          case 'doctor':
            navigate('/doctor-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'nurse':
            navigate('/nurse-dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message || 'Could not connect to the server.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3 w-100">
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;