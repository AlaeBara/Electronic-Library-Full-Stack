import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const Usermanagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin//users', { withCredentials: true });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

 

  const handleDelete = async (userId) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, { withCredentials: true });
        fetchUsers();
      }
    } catch (err) {
      setError('Failed to delete the user. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>User Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Usermanagement;
