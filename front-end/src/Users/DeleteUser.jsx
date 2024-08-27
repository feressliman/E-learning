import React from 'react';
import './css/DeleteUser.css';



const DeleteUser = ({ userId, userName, onConfirm, onCancel }) => {
    return (
        <div className="delete-user-overlay">
            <div className="delete-user-dialog">
                <h3>Confirmation</h3>
                <p>Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{userName}</strong>?</p>
                <div className="button-group">
                    <button onClick={() => onConfirm(userId)} className="confirm-button">Oui</button>
                    <button onClick={onCancel} className="cancel-button">Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;
