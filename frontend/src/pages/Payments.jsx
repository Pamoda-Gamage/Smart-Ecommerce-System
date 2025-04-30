import SearchPayments from '../components/SearchPayments';
import axios from 'axios';

function Payments() {
  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments/report/pdf`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'payments-report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
      alert('Error generating report');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <button
        onClick={handleGenerateReport}
        style={{ backgroundColor: '#3498db', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', marginBottom: '1rem' }}
      >
        Generate Report
      </button>
      <SearchPayments />
    </div>
  );
}

export default Payments;