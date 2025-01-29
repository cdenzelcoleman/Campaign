import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { AuthContext } from '../../context/AuthContext.jsx';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">The Campaign</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/campaigns">Campaigns</Link>
        </li>
        <li>
          <Link to="/campaigns/published">Published Campaigns</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/new-campaign">New Campaign</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
        {!user ? (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </>
        ) : (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;