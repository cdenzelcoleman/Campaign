import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import * as authService from '../../services/authService';
import {useNavigate} from 'react-router';
import './SignUpPage.css';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const {setUser} = useContext(AuthContext);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.signUp(formData);
      navigate('/');
      setUser(user);
    } catch (err) {
      console.log(err);
      setErrorMsg('Sign Up Failed - Try Again');
    }
  }

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <div className="signup-container">
      <h2>Sign Up!</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        </div>
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
        <div className="form-group">        
        <label>Confirm</label>
        <input
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          required
        />
        </div>
        <button type="submit" disabled={disable}>
          SIGN UP
        </button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </div>
    </>
  );
}
