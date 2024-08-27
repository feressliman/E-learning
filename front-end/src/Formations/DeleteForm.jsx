import React from 'react';
import './css/DeleteForm.css';

const DeleteFormation = ({ formationId, formationTitle, onConfirm, onCancel }) => {
    return (
        <div className="delete-form-overlay">
            <div className="delete-form-dialog">
                <h3>Confirmation</h3>
                <p>Êtes-vous sûr de vouloir supprimer la formation <strong>{formationTitle}</strong> ?</p>
                <div className="button-group">
                <button className="confirm-button" onClick={() => onConfirm(formationId)}>Oui</button>
                <button className="cancel-button" onClick={onCancel}>Annuler</button>
            </div>
            </div>
        </div>
    );
};

export default DeleteFormation;
