import React, { useState } from 'react';
import './Auth.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }  // Autoriser l'envoi des cookies avec la requête
      );
    
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        setMessage('Login successful');
        setTimeout(() => {
          navigate('/Dashboard');
        }, 50);
      } else {
        setMessage(response.data.msg || 'Login failed. Please try again later.');
      }
    } catch (error) {
      console.error('Erreur lors du login:', error); // Ajoute ce log
      setMessage(`Error: ${error.response?.data?.msg || 'Login failed. Please try again later.'}`);
    }
  };
  
  
  

  return (
    <div className='background'>
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon' />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          {message && <p className="message">{message}</p>}
          <div className="register-link">
            <p>Don't have an account? <a href="/Register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;