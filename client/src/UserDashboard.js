// src/UserDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

function UserDashboard() {
  const [type, setType] = useState('UPI to Cash');
  const [amount, setAmount] = useState('');
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/requests/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/requests/submit',
        { type, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Request submitted successfully!');
      setAmount('');
      fetchRequests();
    } catch (err) {
      setMessage('Failed to submit request');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">User Dashboard</h2>

      <Card className="p-4 mb-4 shadow">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="type" className="mb-3">
                <Form.Label>Request Type</Form.Label>
                <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option>UPI to Cash</option>
                  <option>Cash to UPI</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="amount" className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary">Submit Request</Button>
        </Form>
        {message && <Alert className="mt-3">{message}</Alert>}
      </Card>

      <h4 className="mb-3">Your Requests</h4>
      {requests.length === 0 ? (
        <Alert variant="info">You haven't submitted any requests yet.</Alert>
      ) : (
        <ul className="list-group">
          {requests.map((req) => (
            <li key={req._id} className="list-group-item">
              <strong>{req.type}</strong> - ₹{req.amount} - <em>{req.status}</em>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default UserDashboard;
