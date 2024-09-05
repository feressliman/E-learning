import React, { useState, useEffect } from 'react';
import '../Assets/Assets.css';
import { MdDashboardCustomize, MdSchool } from "react-icons/md";
import { PiUserList } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineRead } from 'react-icons/ai';

const Sidebar = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Récupérer le rôle depuis le local storage après la connexion
        const storedRole = localStorage.getItem('role');
        console.log('Stored Role:', storedRole);
        setRole(storedRole);
    }, []);

    if (role === null) {
        return <div>Loading...</div>; // Afficher un message ou un composant de chargement
    }

    return (
        <div className="sidebar">
            <div className="logo">
                <h2>E-Learning</h2>
            </div>
            <ul className="nav-links">
            <li><a href="/Dashboard">Tableau de bord <MdDashboardCustomize className='icon' /></a></li>

                {role === 'admin' && (
                    <>
                        <li><a href="/AfficherUser">Utilisateurs <PiUserList className='icon' /></a></li>
                        <li><a href="/AfficherForm">Formations <MdSchool className='icon' /></a></li>
                        <li><a href="#">Cours <AiOutlineRead className='icon' /></a></li>
                    </>
                )}
                {role === 'formateur' && (
                    <>
                        <li><a href="/AfficherForm">Formations <MdSchool className='icon' /></a></li>
                        <li><a href="#">Cours <AiOutlineRead className='icon' /></a></li>
                    </>
                )}
                {role === 'etudiant' && (
                    <li><a href="#">Cours <AiOutlineRead className='icon' /></a></li>
                )}
                {/* Éléments communs */}
                <li><a href="/Profile">Profil <RiUserSettingsLine className='icon' /></a></li>
                <li><a href="/logout">Déconnexion <IoMdLogOut className='icon' /></a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
