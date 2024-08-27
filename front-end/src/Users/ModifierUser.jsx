import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './css/ModifierUser.css'; // Ensure you have appropriate CSS styles

// Define validation schema with Yup
const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Role is required'),
    tel: yup.string().matches(/^[0-9]+$/, 'Phone number must be numeric').required('Phone number is required')
}).required();

const ModifierUser = () => {
    const { id } = useParams(); // Retrieve user ID from URL params
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/getUserById/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUser(data.byid);
                // Set form values
                setValue('name', data.byid.name);
                setValue('email', data.byid.email);
                setValue('password', data.byid.password);
                setValue('role', data.byid.role);
                setValue('tel', data.byid.tel);

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:5000/user/updateUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id, ...data }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/AfficherUser'); // Navigate back to user list on success
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="modifier-user-container">
            <h2>Modifier Utilisateur</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" {...register('name')} />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" {...register('email')} />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" {...register('password')} />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select id="role" {...register('role')}>
                        <option value="admin">Admin</option>
                        <option value="formateur">Formateur</option>
                        <option value="etudiant">Etudiant</option>
                    </select>
                    {errors.role && <p className="error">{errors.role.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="tel">Tel:</label>
                    <input id="tel" type="tel" {...register('tel')} />
                    {errors.tel && <p className="error">{errors.tel.message}</p>}
                </div>
                
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default ModifierUser;
