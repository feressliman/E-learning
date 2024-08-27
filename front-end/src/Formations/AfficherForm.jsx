import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AfficherForm.css';
import Sidebar from '../Components/Assets/Sidebar';
import Header from '../Components/Assets/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import DeleteFormation from './DeleteForm'; // Assuming you've created a DeleteFormation component

const AfficherForm = () => {
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedFormationId, setSelectedFormationId] = useState(null);
    const [selectedFormationTitle, setSelectedFormationTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await fetch('http://localhost:5000/form/getFormations');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormations(Array.isArray(data) ? data : data.formations);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFormations();
    }, []);

    const handleModify = (formationId) => {
        navigate(`/ModifierForm/${formationId}`);
    };

    const handleDelete = (formationId, formationTitle) => {
        setSelectedFormationId(formationId);
        setSelectedFormationTitle(formationTitle);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async (formationId) => {
        try {
            const response = await fetch(`http://localhost:5000/form/deleteFormation/${formationId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Failed to delete formation with ID ${formationId}: ${response.statusText}`);
            }
            setFormations(formations.filter(formation => formation._id !== formationId));
            console.log(`Formation with ID ${formationId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting the formation:', error);
        } finally {
            setShowDeleteDialog(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
    };

    const handleAddFormation = () => {
        navigate('/AddForm');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Header userName="Nom de l'utilisateur" />
                <div className="formation-list-container">
                    <div className="header-container">
                        <h2>Liste des formations</h2>
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="icon add-icon" 
                            onClick={handleAddFormation} 
                            title="Ajouter une formation"
                        />
                    </div>
                    <table className="formation-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Durée</th>
                                <th>Formateur</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formations.length > 0 ? (
                                formations.map(formation => (
                                    <tr key={formation._id}>
                                        <td>{formation._id}</td>
                                        <td>{formation.titre}</td>
                                        <td>{formation.description}</td>
                                        <td>{formation.duree}</td>
                                        <td>{formation.formateur.name}</td>
                                        <td>
                                            <FontAwesomeIcon 
                                                icon={faEdit} 
                                                className="icon edit-icon" 
                                                onClick={() => handleModify(formation._id)} 
                                                title="Modifier"
                                            />
                                            <FontAwesomeIcon 
                                                icon={faTrashAlt} 
                                                className="icon delete-icon" 
                                                onClick={() => handleDelete(formation._id, formation.titre)} 
                                                title="Supprimer"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Aucune formation trouvée.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showDeleteDialog && (
                <DeleteFormation 
                    formationId={selectedFormationId} 
                    formationTitle={selectedFormationTitle} 
                    onConfirm={confirmDelete} 
                    onCancel={cancelDelete} 
                />
            )}
        </div>
    );
};

export default AfficherForm;
