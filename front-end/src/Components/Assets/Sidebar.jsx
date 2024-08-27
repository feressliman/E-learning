import React from 'react';
import '../Assets/Assets.css';
import { MdDashboardCustomize, MdSchool   } from "react-icons/md";
import { PiUserList } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineRead } from 'react-icons/ai';


const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <h2>E-Learning</h2>
            </div>
            <ul className="nav-links">
                <li><a href="/Dashboard">Tableau de bord   <MdDashboardCustomize className='icon'/>  </a></li>
                <li><a href="/AfficherUser">Utilisateurs  <PiUserList className='icon'/> </a></li>
                <li><a href="/AfficherForm">Formations<MdSchool className='icon'/></a></li>
                <li><a href="#">Cours <AiOutlineRead className='icon'/></a></li>
                <li><a href="/Profile">Profil <RiUserSettingsLine className='icon'/></a></li>
                <li><a href="/">Déconnexion <IoMdLogOut className='icon'/>
                </a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
