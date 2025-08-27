import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router';
import * as authService from '../../services/authService';
import './LogInPage.css';

export default function LogInPage() {
  const [formData, setFormData] = useState({email: '',password: '',});
  const [errorMsg, setErrorMsg] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      navigate('/');
      setUser(user);
    } catch (err) {
      console.log(err);
      setErrorMsg('Log In Failed - Try Again');
    }
  }

  return (
    <div className="login-container">
    <>
      <h2>Log In!</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        </div>
        <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        </div>
        <button type="submit">LOG IN</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
    </div>
  );
}