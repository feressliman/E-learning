import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('etudiant');
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
        role,
      });
      setMessage(response.data.msg || 'Inscription réussie');
      navigate('/');
    } catch (error) {
      console.error('Erreur:', error.response || error.message);
      setMessage(error.response?.data.msg || 'Échec de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className='background'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Inscription</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder='Nom d\utilisateur'
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
              placeholder='Mot de passe'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder='Téléphone'
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Sélectionner un rôle</option>
              <option value="admin">Admin</option>
              <option value="formateur">Formateur</option>
              <option value="etudiant">Étudiant</option>
            </select>
          </div>
          <button type="submit">S'inscrire</button>
          {message && <p className="message">{message}</p>}
          <div className="register-link">
            <p>Vous avez déjà un compte ? <a href="/">Connexion</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
