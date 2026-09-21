const express = require('express');
const router = express.Router();

const {
  submitRequest,
  getUserRequests,
  getAllRequests,
  updateRequestStatus
} = require('../controllers/requestController');

const { authenticateUser } = require('../middleware/authMiddleware');

// 🔐 User Routes
router.post('/submit', authenticateUser, submitRequest);
router.get('/user', authenticateUser, getUserRequests);

// 🔐 Admin Routes
router.get('/admin/all', authenticateUser, getAllRequests);        // Get all requests
router.patch('/admin/:requestId', authenticateUser, updateRequestStatus); // Approve/Reject

module.exports = router;
