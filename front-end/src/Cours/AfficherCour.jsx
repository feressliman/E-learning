import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AfficherCour.css';
import Sidebar from '../Components/Assets/Sidebar';
import Header from '../Components/Assets/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import DeleteCour  from './DeleteCour'
const AfficherCour = () => {
    const [cours, setCours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedCourId, setSelectedCourId] = useState(null);
    const [selectedCourTitle, setSelectedCourTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await fetch('http://localhost:5000/cour/getCours');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCours(Array.isArray(data.cours) ? data.cours : []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCours();
    }, []);

    const handleModify = (courId) => {
        navigate(`/ModifierCour/${courId}`);
    };

    const handleDelete = (courId, courTitle) => {
        setSelectedCourId(courId);
        setSelectedCourTitle(courTitle);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async (courId) => {
        try {
            const response = await fetch(`http://localhost:5000/cour/deleteCour/${courId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Failed to delete cour with ID ${courId}: ${response.statusText}`);
            }
            setCours(cours.filter(cour => cour._id !== courId));
            console.log(`Cour with ID ${courId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting the cour:', error);
        } finally {
            setShowDeleteDialog(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
    };

    const handleAddCour = () => {
        navigate('/AddCour');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Header userName="Nom de l'utilisateur" />
                <div className="cour-list-container">
                    <div className="header-container">
                        <h2>Liste des Cours</h2>
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="icon add-icon" 
                            onClick={handleAddCour} 
                            title="Ajouter un cours"
                        />
                    </div>
                    <table className="cour-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Vidéo</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cours.length > 0 ? (
                                cours.map(cour => (
                                    <tr key={cour._id}>
                                        <td>{cour._id}</td>
                                        <td>{cour.titre}</td>
                                        <td>{cour.description}</td>
                                        <td>
                                            <video controls className="cour-video">
                                                <source src={cour.videoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </td>
                                        <td>
                                            <FontAwesomeIcon 
                                                icon={faEdit} 
                                                className="icon edit-icon" 
                                                onClick={() => handleModify(cour._id)} 
                                                title="Modifier"
                                            />
                                            <FontAwesomeIcon 
                                                icon={faTrashAlt} 
                                                className="icon delete-icon" 
                                                onClick={() => handleDelete(cour._id, cour.titre)} 
                                                title="Supprimer"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Aucun cours trouvé.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showDeleteDialog && (
                <DeleteCour 
                    courId={selectedCourId} 
                    courTitle={selectedCourTitle} 
                    onConfirm={confirmDelete} 
                    onCancel={cancelDelete} 
                />
            )}
        </div>
    );
};

export default AfficherCour;
