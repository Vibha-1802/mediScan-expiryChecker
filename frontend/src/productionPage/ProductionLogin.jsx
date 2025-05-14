import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ProductionLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // message to display on page
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // clear any previous messages

    axios
      .post('http://localhost:5000/production-login', {
        username,
        password
      })
      .then((response) => {
        setMessage('Login successful!');
        console.log('User:', response.data.user);
        localStorage.setItem('isLoggedIn', 'true');
      setTimeout(() => {
          navigate('/generation');
        }, 2000); 
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message || 'Login failed');
        } else {
          setMessage('Server/network error');
        }
      });
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form
        onSubmit={handleLogin}
        style={{ background: '#fff', padding: '2rem', borderRadius: '10px', textAlign: 'center' }}
      >
        <h2>Production Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
        <br /><br />
        {message && (
          <div style={{ color: message === 'Login successful!' ? 'green' : 'red' }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default ProductionLogin;
