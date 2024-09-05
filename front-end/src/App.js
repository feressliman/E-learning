import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Authentification/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Register from './Authentification/Register';
import AddUser from './Users/AddUser';
import AfficherUser from './Users/AfficherUser';
import AfficherForm from './Formations/AfficherForm';
import AddForm from './Formations/AddForm';
import ModifierUser from './Users/ModifierUser';
import Profile from './Profil/Profile';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Router>
      
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Login />} />  
        <Route path="/Register" element={<Register />} />

        {/* Routes protégées */}
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute role={['admin', 'formateur', 'etudiant']}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/AddUser"
          element={
            <PrivateRoute role="admin">
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/AfficherUser"
          element={
            <PrivateRoute role="admin">
              <AfficherUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/AfficherForm"
          element={
            <PrivateRoute role={['admin', 'formateur']}>
              <AfficherForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/AddForm"
          element={
            <PrivateRoute role={['admin', 'formateur']}>
              <AddForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/ModifierUser/:id"
          element={
            <PrivateRoute role="admin">
              <ModifierUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <PrivateRoute role={['admin', 'formateur', 'etudiant']}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
