import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import axios from 'axios';

function Dashboard() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRole(res.data.role);
      } catch (err) {
        console.error('Error fetching user role:', err);
      }
    };

    fetchRole();
  }, []);

  if (!role) return <p>Loading dashboard...</p>;

  return role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
}

export default Dashboard;
