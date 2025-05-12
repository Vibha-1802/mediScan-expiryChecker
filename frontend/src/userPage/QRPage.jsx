import { useState, useRef } from 'react';
import jsQR from 'jsqr';
import axios from 'axios';

function QRPage() {
  const [fileName, setFileName] = useState('');
  const [uuid, setUUID] = useState('');
   const [status, setStatus] = useState('');
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
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default QRPage;
