import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AfficherUser.css';
import Sidebar from '../Components/Assets/Sidebar';
import Header from '../Components/Assets/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import DeleteUser from './DeleteUser';

const AfficherUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/getUsers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setUsers(data);
                } else if (Array.isArray(data.users)) {
                    setUsers(data.users);
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleModify = (userId) => {
        navigate(`/ModifierUser/${userId}`);
    };

    const handleDelete = (userId, userName) => {
        setSelectedUserId(userId);
        setSelectedUserName(userName);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/user/deleteUser/${userId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Failed to delete user with ID ${userId}: ${response.statusText}`);
            }
            setUsers(users.filter(user => user._id !== userId));
            console.log(`Utilisateur avec ID ${userId} supprimé avec succès.`);
        } catch (error) {
            console.error('Erreur lors de la suppression de l’utilisateur:', error);
        } finally {
            setShowDeleteDialog(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
    };

    const handleAddUser = () => {
        navigate('/AddUser');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Header userName="Nom de l'utilisateur" />
                <div className="user-list-container">
                    <div className="header-container">
                        <h2>Liste des utilisateurs</h2>
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="icon add-icon" 
                            onClick={handleAddUser} 
                            title="Ajouter un utilisateur"
                        />
                    </div>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Téléphone</th> {/* Ajout de la colonne pour le numéro de téléphone */}
                                <th>Photo de profil</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="7">Aucun utilisateur trouvé.</td>
                                </tr>
                            ) : (
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.tel}</td> {/* Affichage du numéro de téléphone */}
                                        <td>
                                            <img 
                                                src={user.photoprofile || '/default-avatar.png'} 
                                                alt="Profile" 
                                                className="profile-image"
                                            />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon 
                                                icon={faEdit} 
                                                className="icon edit-icon" 
                                                onClick={() => handleModify(user._id)} 
                                                title="Modifier"
                                            />
                                            <FontAwesomeIcon 
                                                icon={faTrashAlt} 
                                                className="icon delete-icon" 
                                                onClick={() => handleDelete(user._id, user.name)} 
                                                title="Supprimer"
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showDeleteDialog && (
                <DeleteUser 
                    userId={selectedUserId} 
                    userName={selectedUserName} 
                    onConfirm={confirmDelete} 
                    onCancel={cancelDelete} 
                />
            )}
        </div>
    );
};

export default AfficherUser;
