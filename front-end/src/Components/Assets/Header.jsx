import React, { useState } from 'react';
import '../Assets/Assets.css';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const FadeInDiv = styled.div`
    animation: ${fadeIn} 0.3s ease-in-out;
`;

const Header = ({ userName }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleEditProfile = () => {
        // Logic to handle profile editing
        console.log("Modifier Profil clicked");
    };

    const handleLogout = () => {
        // Logic to handle logout
        console.log("Déconnecter clicked");
    };

    return (
        <header style={headerStyle}>
            <h1 style={titleStyle}>Bienvenue, {userName}</h1>
            <div className="user-info" style={userInfoStyle}>
                <div onClick={toggleDropdown} style={avatarContainerStyle}>
                    <img
                        src={imageSrc || 'user-avatar.jpg'}
                        alt="User Avatar"
                        style={avatarStyle}
                    />
                    <span style={userNameStyle}>{userName}</span>
                    <i className="arrow-icon" style={arrowIconStyle}></i>
                </div>
                {dropdownVisible && (
                    <div className="dropdown-menu" style={dropdownMenuStyle}>
                        <button onClick={handleEditProfile} style={dropdownItemStyle}>
                            Modifier Profil
                        </button>
                        <button onClick={handleLogout} style={dropdownItemStyle}>
                            Déconnecter
                        </button>
                    </div>
                )}
            </div>
            {!imageSrc && (
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            )}
        </header>
    );
};

export default Header;

// Inline styles for modern design
const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    backgroundColor: '#222',
    color: '#fff',
    borderBottom: '2px solid #e5e7eb',
};

const titleStyle = {
    fontSize: '24px',
    margin: 0,
};

const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
};

const avatarContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '8px',
    backgroundColor: '#374151',
    transition: 'background-color 0.3s ease',
};

const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px',
};

const userNameStyle = {
    marginRight: '5px',
    fontSize: '16px',
    fontWeight: '500',
};

const arrowIconStyle = {
    borderTop: '5px solid #fff',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    transition: 'transform 0.3s ease',
    transform: 'rotate(0deg)',
};

const dropdownMenuStyle = {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    zIndex: '10',
    overflow: 'hidden',
    animation: 'fadeIn 0.3s ease-in-out',
};

const dropdownItemStyle = {
    width: '100%',
    padding: '10px 20px',
    textAlign: 'left',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '14px',
    color: '#1f2937',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
};

dropdownItemStyle[':hover'] = {
    backgroundColor: '#f3f4f6',
};

