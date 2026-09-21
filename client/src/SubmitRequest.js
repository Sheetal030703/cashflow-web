import React, { useState } from 'react';
import axios from 'axios';

function SubmitRequest() {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('UPI to Cash');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const res = await axios.post('/api/requests/submit', { amount, type });
      if (res.data.success) {
        setSuccess('Request submitted successfully!');
        setAmount('');
        setType('UPI to Cash');
      } else {
        setError('Failed to submit request.');
      }
    } catch (err) {
      setError('An error occurred while submitting the request.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Submit Cash Request</h2>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>UPI to Cash</option>
            <option>Cash to UPI</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default SubmitRequest;
