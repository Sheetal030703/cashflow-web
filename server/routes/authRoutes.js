const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// SIGNUP route (already working)
router.post('/signup', async (req, res) => {
  console.log("📥 Signup request received:", req.body);
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// ✅ LOGIN route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("📥 Login attempt:", { username, password });

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User not found for username:", username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log("🔐 Found user:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
