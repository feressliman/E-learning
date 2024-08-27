import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './Profile.css';

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  // Schéma de validation avec Yup
  const schema = yup.object().shape({
    name: yup.string().required('Nom est requis'),
    email: yup.string().email('Email invalide').required('Email est requis'),
    tel: yup.string().required('Téléphone est requis'),
    photoprofile: yup.mixed(), // Ajoute une validation pour le fichier si besoin
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/getProfile/${userId}`); // Remplace par l'ID utilisateur réel
        setUserData(response.data);

        // Pré-remplir les champs du formulaire
        setValue('name', response.data.name);
        setValue('email', response.data.email);
        setValue('tel', response.data.tel);
        setValue('photoprofile', response.data.photoprofile);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/user/getProfile/${userId}`, data); // Mettre à jour l'URL avec l'ID utilisateur
      alert('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <div className="profile-container">
      <h2>Modifier Profil</h2>
      {userData ? (
        <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
          <div className="form-group">
            <label>Nom:</label>
            <input type="text" {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Téléphone:</label>
            <input type="text" {...register('tel')} />
            {errors.tel && <p>{errors.tel.message}</p>}
          </div>

          <div className="form-group">
            <label>Photo de profil:</label>
            <input type="file" {...register('photoprofile')} />
            {errors.photoprofile && <p>{errors.photoprofile.message}</p>}
            {userData.photoprofile && (
              <img src={userData.photoprofile} alt="Avatar" className="avatar" />
            )}
          </div>

          <button type="submit" className="submit-button">Mettre à jour</button>
        </form>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default Profile;
