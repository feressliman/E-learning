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
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Response Data:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Store the token if needed
        setMessage('Login successful');
        setTimeout(() => {
          navigate('/Dashboard');  // Navigate to the Dashboard
        }, 50); 
      } else {
        setMessage(response.data.msg || 'Login failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error.response || error.message);

      if (error.response) {
        if (error.response.status === 400) {
          setMessage('Invalid email or password');
        } else {
          setMessage(`Error: ${error.response.data.msg || 'Login failed. Please try again later.'}`);
        }
      } else {
        setMessage('Login failed. Please check your network and try again.');
      }
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
