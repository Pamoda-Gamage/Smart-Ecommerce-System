import { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    cardType: 'Visa',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    telephone: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Invalid date format (MM/YY)';

    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits';

    if (!formData.telephone) newErrors.telephone = 'Telephone is required';
    else if (!/^\d{10}$/.test(formData.telephone)) newErrors.telephone = 'Telephone must be 10 digits';

    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    else if (!/^\d{5}$/.test(formData.zipCode)) newErrors.zipCode = 'Zip code must be 5 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/payments`, formData);
        alert('Payment submitted successfully!');
        setFormData({
          fullName: '',
          cardType: 'Visa',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          telephone: '',
        });
      } catch (error) {
        console.error(error);
        alert('Error submitting payment');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
      <h2>Payment Gateway</h2>
      <div>
        <label>Card Type:</label>
        <select name="cardType" value={formData.cardType} onChange={handleChange}>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="American Express">American Express</option>
          <option value="Discover">Discover</option>
        </select>
      </div>
      <div>
        <label>Card Number:</label>
        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
      </div>
      <div>
        <label>Expiry (MM/YY):</label>
        <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
        {errors.expiryDate && <span style={{ color: 'red' }}>{errors.expiryDate}</span>}
      </div>
      <div>
        <label>CVV:</label>
        <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} />
        {errors.cvv && <span style={{ color: 'red' }}>{errors.cvv}</span>}
      </div>
      <div>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </div>
      <div>
        <label>State:</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} />
      </div>
      <div>
        <label>Zip Code:</label>
        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
        {errors.zipCode && <span style={{ color: 'red' }}>{errors.zipCode}</span>}
      </div>
      <div>
        <label>Telephone:</label>
        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} />
        {errors.telephone && <span style={{ color: 'red' }}>{errors.telephone}</span>}
      </div>
      <button type="submit" style={{ backgroundColor: '#2ecc71', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', marginTop: '1rem' }}>
        Proceed Checkout
      </button>
    </form>
  );
}

export default PaymentForm;