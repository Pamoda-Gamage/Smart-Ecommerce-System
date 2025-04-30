const Payment = require('../models/Payment');
const jsPDF = require('jspdf');
require('jspdf-autotable');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { cardType, cardNumber, expiryDate, cvv, fullName, email, address, city, state, zipCode, telephone } = req.body;

    // Detailed validation
    if (!cardType || !['Visa', 'MasterCard'].includes(cardType)) {
      return res.status(400).json({ message: 'Invalid card type. Must be Visa or MasterCard.' });
    }
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      return res.status(400).json({ message: 'Card number must be 16 digits.' });
    }
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      return res.status(400).json({ message: 'Invalid expiry date. Must be in MM/YY format.' });
    }
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      return res.status(400).json({ message: 'CVV must be 3 digits.' });
    }
    if (!fullName || fullName.trim() === '') {
      return res.status(400).json({ message: 'Full name is required.' });
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!address || address.trim() === '') {
      return res.status(400).json({ message: 'Address is required.' });
    }
    if (!city || city.trim() === '') {
      return res.status(400).json({ message: 'City is required.' });
    }
    if (!state || state.trim() === '') {
      return res.status(400).json({ message: 'State is required.' });
    }
    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
      return res.status(400).json({ message: 'Zip code must be 5 digits.' });
    }
    if (!telephone || !/^\d{10}$/.test(telephone)) {
      return res.status(400).json({ message: 'Telephone must be 10 digits.' });
    }

    // Create and save the payment
    const payment = new Payment({
      cardType,
      cardNumber,
      expiryDate,
      cvv,
      fullName,
      email,
      address,
      city,
      state,
      zipCode,
      telephone,
    });

    await payment.save();
    res.status(201).json({ message: 'Payment submitted successfully', payment });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ message: 'Server error while submitting payment', error: error.message });
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server error while fetching payments', error: error.message });
  }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ message: 'Server error while fetching payment', error: error.message });
  }
};

// Update a payment
exports.updatePayment = async (req, res) => {
  try {
    const { cardType, cardNumber, expiryDate, cvv, fullName, email, address, city, state, zipCode, telephone } = req.body;

    // Validate updated data
    if (cardType && !['Visa', 'MasterCard'].includes(cardType)) {
      return res.status(400).json({ message: 'Invalid card type. Must be Visa or MasterCard.' });
    }
    if (cardNumber && !/^\d{16}$/.test(cardNumber)) {
      return res.status(400).json({ message: 'Card number must be 16 digits.' });
    }
    if (expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      return res.status(400).json({ message: 'Invalid expiry date. Must be in MM/YY format.' });
    }
    if (cvv && !/^\d{3}$/.test(cvv)) {
      return res.status(400).json({ message: 'CVV must be 3 digits.' });
    }
    if (fullName && fullName.trim() === '') {
      return res.status(400).json({ message: 'Full name is required.' });
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (address && address.trim() === '') {
      return res.status(400).json({ message: 'Address is required.' });
    }
    if (city && city.trim() === '') {
      return res.status(400).json({ message: 'City is required.' });
    }
    if (state && state.trim() === '') {
      return res.status(400).json({ message: 'State is required.' });
    }
    if (zipCode && !/^\d{5}$/.test(zipCode)) {
      return res.status(400).json({ message: 'Zip code must be 5 digits.' });
    }
    if (telephone && !/^\d{10}$/.test(telephone)) {
      return res.status(400).json({ message: 'Telephone must be 10 digits.' });
    }

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { cardType, cardNumber, expiryDate, cvv, fullName, email, address, city, state, zipCode, telephone },
      { new: true, runValidators: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ message: 'Server error while updating payment', error: error.message });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ message: 'Server error while deleting payment', error: error.message });
  }
};

// Generate PDF report
exports.generatePDFReport = async (req, res) => {
  try {
    const payments = await Payment.find();

    const doc = new jsPDF();
    doc.text('Payments Report', 10, 10);

    const tableColumn = ['Full Name', 'Card Type', 'Card Number', 'Expiry Date', 'Email', 'Address', 'City', 'State', 'Zip Code', 'Telephone'];
    const tableRows = payments.map(payment => [
      payment.fullName,
      payment.cardType,
      payment.cardNumber,
      payment.expiryDate,
      payment.email,
      payment.address,
      payment.city,
      payment.state,
      payment.zipCode,
      payment.telephone,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    const pdfBuffer = doc.output('arraybuffer');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=payments-report.pdf');
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).json({ message: 'Server error while generating PDF report', error: error.message });
  }
};