import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../services/authService';
import './NavBar.css';
import { AuthContext } from '../../context/AuthContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      await logOut();
      logout(); 
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <nav className="NavBar">
      <NavLink 
        to="/" 
        className={({ isActive }) => (isActive ? 'active' : '')}
        end
      >
        Home
      </NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink 
            to="/posts" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            end
          >
            Post List
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink 
            to="/posts/new" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            New Post
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink 
            to="/campaigns/published" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Published Campaigns
          </NavLink>
          &nbsp; | &nbsp;
          <button 
            onClick={handleLogOut} 
            className="logout-button"
            aria-label="Log Out"
          >
            Log Out
          </button>
          &nbsp; | &nbsp;
          <span className="welcome-message">Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink 
            to="/login" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Log In
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink 
            to="/signup" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
}