import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../Users/css/AddUser.css'; // Update to the correct CSS file

// Validation schema with Yup
const schema = yup.object().shape({
  titre: yup.string().required('Titre is required'),
  description: yup.string().required('Description is required'),
  duree: yup.string().required('Duree is required'),
  formateur: yup.string().required('Formateur is required'),
});

const AddForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/form/createFormation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to add formation: ${response.statusText}`);
      }

      const result = await response.json();
      setSuccessMessage('Formation added successfully!');
      setErrorMessage('');
      reset();

    } catch (error) {
      console.error('Error adding formation:', error);
      setErrorMessage('Failed to add formation. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleClose = () => {
    navigate('/AfficherForm'); // Navigate to the form list page
  };

  return (
    <div className="add-user-container">
      <h2>Add New Formation</h2>

      <button className="icon-button close-button" onClick={handleClose}>
        <i className="fas fa-times"></i>
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="titre">Titre:</label>
          <input id="titre" {...register('titre')} />
          {errors.titre && <p className="error-message">{errors.titre.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" {...register('description')} />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="duree">Durée:</label>
          <input id="duree" type="text" {...register('duree')} />
          {errors.duree && <p className="error-message">{errors.duree.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="formateur">Formateur:</label>
          <input id="formateur" type="text" {...register('formateur')} />
          {errors.formateur && <p className="error-message">{errors.formateur.message}</p>}
        </div>

        <button type="submit">Add Formation</button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddForm;
