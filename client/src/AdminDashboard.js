import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/api/requests/admin');
      setRequests(res.data);
      setFilteredRequests(res.data);
    } catch (error) {
      console.error('Error fetching admin requests:', error);
    }
  };

  const handleFilter = () => {
    if (!fromDate || !toDate) return;

    const filtered = requests.filter((req) => {
      const created = new Date(req.createdAt);
      return created >= new Date(fromDate) && created <= new Date(toDate);
    });

    setFilteredRequests(filtered);
  };

  const handleDownload = () => {
    const csv = Papa.unparse(filteredRequests);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'cash_requests.csv');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <label className="form-label">From Date</label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label className="form-label">To Date</label>
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={handleFilter}>
            Filter
          </button>
        </div>
        <div className="col-md-3 mb-2 d-flex align-items-end">
          <button className="btn btn-success w-100" onClick={handleDownload}>
            Download CSV
          </button>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-center">No requests found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.username}</td>
                  <td>₹{req.amount}</td>
                  <td>{req.type}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.status === 'Approved'
                          ? 'bg-success'
                          : req.status === 'Rejected'
                          ? 'bg-danger'
                          : 'bg-warning text-dark'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>{new Date(req.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
