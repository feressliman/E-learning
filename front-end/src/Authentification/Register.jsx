import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('etudiant'); // Default role
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: username,
        email,
        password,
        tel,
        role, // Include role in the request
      });
      setMessage(response.data.msg || 'Registration successful');
      navigate('/');
    } catch (error) {
      console.error('Error:', error.response || error.message);
      setMessage(error.response?.data.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className='background'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder='Tel'
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="formateur">Formateur</option>
              <option value="etudiant">Etudiant</option>
              </select>
              </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Register</button>
          {message && <p className="message">{message}</p>}
          <div className="register-link">
            <p>Have an account? <a href="/">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
