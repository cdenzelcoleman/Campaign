import { NavLink, Link, useNavigate } from 'react-router';
import { useContext} from 'react';
import { logOut } from '../../services/authService';
import './NavBar.css';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function NavBar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
  } 

  return (
    <nav className="NavBar">
      <div className="NavBar-logo">
        <Link to="/">The Campaign</Link>
      </div>
      <ul className="NavBar-links">
        {user ? (
          <>
            <li>
              <NavLink to="/campaigns">Campaigns</NavLink>
            </li>
            <li>
              <NavLink to="/new-campaign">New Campaign</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <button onClick={handleLogOut}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}