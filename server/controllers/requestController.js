const Request = require('../models/Request');

const submitRequest = async (req, res) => {
  const { amount, type } = req.body;
  try {
    const request = new Request({
      user: req.user.id,
      amount,
      type,
      status: 'pending',
    });
    await request.save();
    res.status(201).json({ message: 'Request submitted successfully', request });
  } catch (error) {
    console.error('❌ Error submitting request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('❌ Error fetching user requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('user', 'email').sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('❌ Error fetching all requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log('🔥 updateRequestStatus called');
  console.log('➡️ Params ID:', id);
  console.log('➡️ Body Status:', status);

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const request = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'email');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ message: `Request ${status} ✅`, request });
  } catch (error) {
    console.error('❌ Error updating request status:', error);
    res.status(500).json({ message: 'Failed to update status ❌' });
  }
};

// ✅ Properly export all
module.exports = {
  submitRequest,
  getUserRequests,
  getAllRequests,
  updateRequestStatus
};
