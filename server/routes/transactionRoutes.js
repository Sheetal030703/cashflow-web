const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ text: 'Sample Transaction', amount: 100 }]);
});

module.exports = router;
