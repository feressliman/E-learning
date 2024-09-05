import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = 'someUserId'; // Remplacez par un ID réel ou obtenez-le dynamiquement
    const token = localStorage.getItem('token');

    console.log('Fetching profile for userId:', userId);
    console.log('Token:', token);

    if (!token) {
      setError('Token manquant.');
      return;
    }

    axios.get(`http://localhost:5000/user/getProfile/${userId}`, {
      headers: {
        'x-auth-token': token
      }
    })
    .then(response => {
      console.log('Profile data received:', response.data);
      setProfile(response.data);
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      setError(error.response ? error.response.data.message : error.message);
    });
  }, []);

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!profile) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Profil Utilisateur</h1>
      <p>Nom: {profile.name || 'Non défini'}</p>
      <p>Email: {profile.email || 'Non défini'}</p>
      {/* Afficher d'autres informations du profil */}
    </div>
  );
}

export default Profile;
