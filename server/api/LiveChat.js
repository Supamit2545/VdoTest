// src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// ตัวอย่าง route ทั่วไป
router.get('/TestConnect', (req, res) => {
  res.json({ message: 'Test API Endpoint is working' });
});

module.exports = router;
