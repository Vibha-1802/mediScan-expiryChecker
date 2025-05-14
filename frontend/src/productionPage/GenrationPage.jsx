import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GenerationPage() {
  const [medicines, setMedicines] = useState([]);
  const [mid, setMid] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [qrUUID, setQrUUID] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/medicines')
      .then(res => setMedicines(res.data))
      .catch(err => console.error('Failed to fetch medicines', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/generation/tablet/generate', {
        mid,
        expiry_date: expiryDate
      });
      setQrUUID(res.data.qrUUID);
      setMessage('Successfully new batch added.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error generating QR');
    }
  };

   const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/production-login');
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          background: '#ff4d4d',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
      <h2>Generate QR for Medicine Tablet</h2>

      <h3>All Medicines</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Ingredient</th>
            <th>Use</th>
            <th>Side Effect</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.medicine_name}</td>
              <td>{m.ingredient}</td>
              <td>{m.use}</td>
              <td>{m.side_effect}</td>
              <td>{m.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ margin: '2rem 0' }} />

      <form onSubmit={handleSubmit}>
        <label>Select Medicine:</label><br />
        <select value={mid} onChange={e => setMid(e.target.value)} required>
          <option value=''>-- Select Medicine ID --</option>
          {medicines.map(med => (
            <option key={med.id} value={med.id}>
              {med.id} - {med.medicine_name}
            </option>
          ))}
        </select><br /><br />

        <label>Enter Expiry Date:</label><br />
        <input
          type="date"
          value={expiryDate}
          onChange={e => setExpiryDate(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Generate</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {qrUUID && (
        <div style={{ marginTop: '2rem' }}>
          <h4>QR Code:</h4>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrUUID}&size=45x45`}
            alt="QR Code"
          />
        </div>
      )}
    </div>
  );
}

export default GenerationPage;