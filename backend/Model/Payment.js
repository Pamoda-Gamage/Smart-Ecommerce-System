const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cardType: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  telephone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);