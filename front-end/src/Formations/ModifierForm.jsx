import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './css/ModifierForm.css'; 

// Define validation schema with Yup
const schema = yup.object({
    titre: yup.string().required('Titre is required'),
    description: yup.string().required('Description is required'),
    duree: yup.string().required('Durée is required'),
    formateur: yup.string().required('Formateur is required'),
}).required();

const ModifierForm = () => {
    const { id } = useParams(); // Retrieve formation ID from URL params
    const [formation, setFormation] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchFormation = async () => {
            try {
                const response = await fetch(`http://localhost:5000/form/getFormationbyId/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch formation data');
                }

                const data = await response.json();
                setFormation(data); // Assuming data is directly the formation object
                // Set form values
                setValue('titre', data.titre);
                setValue('description', data.description);
                setValue('duree', data.duree);
                setValue('formateur', data.formateur);
            } catch (error) {
                setError(error.message); // Set error state
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        fetchFormation();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:5000/form/updateFormation`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id, ...data }),
            });

            if (!response.ok) {
                throw new Error('Failed to update formation');
            }

            navigate('/AfficherForm'); // Navigate back to formation list on success
        } catch (error) {
            console.error('Error updating formation:', error);
            setError('Failed to update formation'); // Set error state
        }
    };

    // Display loading message while fetching data
    if (loading) return <p>Loading...</p>;

    // Display error message if there's an issue fetching data
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="modifier-formation-container">
            <h2>Modifier Formation</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="titre">Titre:</label>
                    <input id="titre" type="text" {...register('titre')} />
                    {errors.titre && <p className="error">{errors.titre.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" {...register('description')} />
                    {errors.description && <p className="error">{errors.description.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="duree">Durée:</label>
                    <input id="duree" type="text" {...register('duree')} />
                    {errors.duree && <p className="error">{errors.duree.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="formateur">Formateur:</label>
                    <input id="formateur" type="text" {...register('formateur')} />
                    {errors.formateur && <p className="error">{errors.formateur.message}</p>}
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default ModifierForm;
