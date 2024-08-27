import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../Users/css/AddUser.css'; // Assurez-vous que le chemin est correct

// Validation schema with Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().oneOf(['admin', 'etudiant', 'formateur'], 'Invalid role').required('Role is required'),
  tel: yup.string().required('Telephone number is required'),
  photoprofile: yup.mixed().nullable(), // Handle file upload separately
});

const AddUser = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // Ajoutez chaque champ du formulaire
      Object.keys(data).forEach(key => {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      });
  
      // Ajoutez le fichier de photo de profil s'il est présent
      if (data.photoprofile && data.photoprofile[0]) {
        formData.append('photoprofile', data.photoprofile[0]);
      }
  
      const response = await fetch('http://localhost:5000/user/createUser', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add user: ${response.statusText}`);
      }
  
      const result = await response.json();
      setSuccessMessage('User added successfully!');
      setErrorMessage('');
      reset();
  
    } catch (error) {
      console.error('Error adding user:', error);
      setErrorMessage('Failed to add user. Please try again.');
      setSuccessMessage('');
    }
  };
  

  const handleClose = () => {
    navigate('/AfficherUser'); // Navigate to the user list page
  };

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>

      <button className="icon-button close-button" onClick={handleClose}>
        <i className="fas fa-times"></i>
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input id="name" {...register('name')} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="tel">Telephone:</label>
          <input id="tel" {...register('tel')} />
          {errors.tel && <p className="error-message">{errors.tel.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select id="role" {...register('role')}>
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="etudiant">Etudiant</option>
            <option value="formateur">Formateur</option>
          </select>
          {errors.role && <p className="error-message">{errors.role.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="photoprofile">Photo Profile:</label>
          <input id="photoprofile" type="file" {...register('photoprofile')} />
        </div>

        <button type="submit" className="submit-button">Add User</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddUser;
