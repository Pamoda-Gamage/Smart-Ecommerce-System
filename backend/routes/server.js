// server.js - Basic Express server

const express = require('express');
const app = express();
const paymentRoutes = require('./routes/paymentRoutes');

app.use(express.json());
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
