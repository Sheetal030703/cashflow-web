const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// ✅ Correctly destructure all handlers
const {
  submitRequest,
  getUserRequests,
  getAllRequests,
  updateRequestStatus
} = require('../controllers/requestController');

router.post('/submit', verifyToken, submitRequest);
router.get('/user', verifyToken, getUserRequests);
router.get('/admin/all', verifyToken, isAdmin, getAllRequests);
router.put('/:id/status', verifyToken, isAdmin, updateRequestStatus);

module.exports = router;
