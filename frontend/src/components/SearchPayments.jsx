import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SearchPayments() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    toast.warn(
      <div>
        <p>The following record is being deleted. Are you sure?</p>
        <button
          onClick={async () => {
            try {
              await axios.delete(`${import.meta.env.VITE_API_URL}/payments/${id}`);
              setPayments(payments.filter(payment => payment._id !== id));
              toast.success('Payment deleted successfully!');
            } catch (error) {
              toast.error('Error deleting payment');
            }
          }}
          style={{ backgroundColor: '#e74c3c', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '5px', marginRight: '1rem' }}
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss()}
          style={{ backgroundColor: '#7f8c8d', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '5px' }}
        >
          No
        </button>
      </div>,
      { autoClose: false }
    );
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Payments</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
            <th>Full Name</th>
            <th>Card Type</th>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td>{payment.fullName}</td>
              <td>{payment.cardType}</td>
              <td>{payment.cardNumber}</td>
              <td>{payment.expiryDate}</td>
              <td>{payment.email}</td>
              <td>{payment.address}</td>
              <td>{payment.city}</td>
              <td>{payment.state}</td>
              <td>{payment.zipCode}</td>
              <td>
                <button
                  onClick={() => handleEdit(payment._id)}
                  style={{ backgroundColor: '#2ecc71', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '5px', marginRight: '0.5rem' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(payment._id)}
                  style={{ backgroundColor: '#e74c3c', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '5px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchPayments;