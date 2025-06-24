import { NavLink, Link, useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import { logOut } from '../../services/authService';
import './NavBar.css';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function NavBar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
    setIsMenuOpen(false); // Close menu after logout
  }
  
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  
  function closeMenu() {
    setIsMenuOpen(false);
  } 

  return (
    <nav className="NavBar">
      <div className="NavBar-logo">
        <Link to="/" onClick={closeMenu}>The Campaign</Link>
      </div>
      
      <button 
        className={`NavBar-hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul className={`NavBar-links ${isMenuOpen ? 'active' : ''}`}>
        {user ? (
          <>
            <li>
              <NavLink to="/campaigns" onClick={closeMenu}>Campaigns</NavLink>
            </li>
            <li>
              <NavLink to="/new-campaign" onClick={closeMenu}>New Campaign</NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
            </li>
            <li>
              <button onClick={handleLogOut}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/signup" onClick={closeMenu}>Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/login" onClick={closeMenu}>Log In</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}