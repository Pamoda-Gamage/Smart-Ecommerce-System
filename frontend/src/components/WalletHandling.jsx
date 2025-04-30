import { useState, useEffect } from 'react';
import axios from 'axios';

function WalletHandling() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments`);
        setPayments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPayments();
  }, []);

  const handleAddPoints = async (id, currentPoints) => {
    try {
      const newPoints = currentPoints + 10; // Add 10 points for frequent customers
      await axios.put(`${import.meta.env.VITE_API_URL}/payments/${id}`, { walletPoints: newPoints });
      setPayments(payments.map(payment => payment._id === id ? { ...payment, walletPoints: newPoints } : payment));
      alert('Points added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding points');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Wallet Handling</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
            <th>Full Name</th>
            <th>Email</th>
            <th>Wallet Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td>{payment.fullName}</td>
              <td>{payment.email}</td>
              <td>{payment.walletPoints || 0}</td>
              <td>
                <button
                  onClick={() => handleAddPoints(payment._id, payment.walletPoints || 0)}
                  style={{ backgroundColor: '#f1c40f', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '5px' }}
                >
                  Add Points
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WalletHandling;