/*import React, { useRef, useState } from 'react';
import jsQR from 'jsqr';

export default function QRImageDecoder() {
  const canvasRef = useRef(null);
  const [decoded, setDecoded] = useState('');

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setDecoded(code.data); // decoded content
      } else {
        setDecoded('❌ No QR code detected.');
      }
    };
  };

  return (
    <div>
      <h2>Upload QR Code Image</h2>
      <input type="file" accept="image/*" onChange={handleFile} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {decoded && <p><strong>Decoded content:</strong> {decoded}</p>}
    </div>
  );
}
*/
/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/