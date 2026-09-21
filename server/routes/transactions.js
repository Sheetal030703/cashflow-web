const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// 👉 POST: Add new transaction
router.post('/', async (req, res) => {
  const { name, amount, type } = req.body;
  try {
    const newTx = new Transaction({ name, amount, type });
    await newTx.save();
    res.status(201).json(newTx);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

// 👉 GET: Fetch all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

module.exports = router;
