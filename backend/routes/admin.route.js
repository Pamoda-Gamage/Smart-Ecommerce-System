const express = require('express');
const router = express.Router();

// Mock admin data
const adminData = {
  id: "123456",
  email: "admin@example.com",
  role: "admin"
};

// Route to get admin data
router.get('/admin-info', (req, res) => {
  res.json(adminData);
});

module.exports = router;
