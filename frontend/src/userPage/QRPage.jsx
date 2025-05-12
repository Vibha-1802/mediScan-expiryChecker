import { useState, useRef } from 'react';
import jsQR from 'jsqr';
import axios from 'axios';

function QRPage() {
  const [fileName, setFileName] = useState('');
  const [uuid, setUUID] = useState('');
  const [status, setStatus] = useState('');
  const [medicineData, setMedicineData] = useState(null);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0, img.width, img.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
        const decodedUUID = code.data;
          setUUID(decodedUUID);
            setStatus('✅ QR decoded. Sending to backend...');
           axios.post('http://localhost:5000/qr', { qrUUID: decodedUUID })
           .then((res) => {
           console.log('✅ Backend response:', res.data);
            setMedicineData(res.data);  
            setStatus('✅ Data received from backend!');
         })
           .catch((err) => {
            console.error('❌ Error sending UUID:', err);
            setStatus('❌ Backend error: ' + err.message);
          });
        } 
        else {
          setUUID('');
          setStatus('❌ QR code not recognized.');
        }
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
  <div style={{ textAlign: 'center', marginTop: '5rem' }}>
    <h2>Upload QR Image</h2>
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleFileChange}
      style={{ marginTop: '1rem' }}
    />
    {status && <p style={{ marginTop: '1rem' }}>{status}</p>}

    {/* Display the medicine information if available */}
    {medicineData && (
      <div style={{ marginTop: '2rem' }}>
        <h3>Medicine Information</h3>
        <table border="1" style={{ margin: 'auto', padding: '10px' }}>
          <tbody>
            <tr>
              <td><strong>Medicine Name:</strong></td>
              <td>{medicineData.medicine_name}</td>
            </tr>
            <tr>
              <td><strong>Ingredient:</strong></td>
              <td>{medicineData.ingredient}</td>
            </tr>
            <tr>
              <td><strong>Use:</strong></td>
              <td>{medicineData.use}</td>
            </tr>
            <tr>
              <td><strong>Side Effect:</strong></td>
              <td>{medicineData.side_effect}</td>
            </tr>
            <tr>
              <td><strong>Price:</strong></td>
              <td>{medicineData.price}</td>
            </tr>
            <tr>
              <td><strong>Expiry Date:</strong></td>
              <td>{medicineData.expiry_date}</td>
            </tr>
            <tr>
              <td><strong>Status:</strong></td>
              <td>{medicineData.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}

    <canvas ref={canvasRef} style={{ display: 'none' }} />
  </div>
);
}

export default QRPage;
