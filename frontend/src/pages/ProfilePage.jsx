import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateUserProfile } from '../services/authService';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await updateUserProfile({ username, email }, token);
          setUser(response.data);
         
        } catch (error) {
          console.error('Failed to load user profile:', error);
          setError('Failed to load user profile');
        }
      }
    };
    fetchUser();
  }, [token, setUser, username, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile({ username, email }, token);
      setUser(updatedUser.data);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <>
    <div className='profile-container-page'>
    <div>
      <div className='profile-container'>
      <h2>Your Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
          <div className='form-group'>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Username"
          />
          </div>
        </div>
          <div className='form-group'>      
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default ProfilePage;