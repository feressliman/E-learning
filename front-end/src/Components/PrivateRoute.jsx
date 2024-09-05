import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('role');
  
  if (!userRole || !role.includes(userRole)) {
    return <Navigate to="/" />;  // Redirection si l'utilisateur n'est pas connecté ou n'a pas le bon rôle
  }

  return children;  // Retourner le composant protégé
};

export default PrivateRoute;
