import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPaymentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPayment();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/payments/${id}`, formData);
      alert('Payment updated successfully!');
      navigate('/payments');
    } catch (error) {
      console.error(error);
      alert('Error updating payment');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
      <h2>Edit Payment</h2>
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
      </div>
      <div>
        <label>CVV:</label>
        <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} />
      </div>
      <div>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
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
      </div>
      <div>
        <label>Telephone:</label>
        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} />
      </div>
      <button type="submit" style={{ backgroundColor: '#2ecc71', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', marginTop: '1rem' }}>
        Update Payment
      </button>
    </form>
  );
}

export default EditPaymentForm;