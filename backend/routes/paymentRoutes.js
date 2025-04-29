// Dummy payment route - Pamoda Gamage

const express = require('express');
const router = express.Router();

router.get('/payments', (req, res) => {
  res.send('This is the payment endpoint.');
});

module.exports = router;
