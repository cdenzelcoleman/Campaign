import React, { createContext, useState, useEffect } from 'react';
import { signUp, logIn } from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const currentUser = getUser(); 
          setUser(currentUser);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchUser();
  }, []);

  const handleSignup = async (userData) => {
    const response = await signUp(userData); 
    setUser(response.user);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
  };

  const handleLogin = async (credentials) => {
    const response = await logIn(credentials); 
    setUser(response.user);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, signup: handleSignup, login: handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function getUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return null;
      }
      return payload.user;
    } catch (error) {
      console.error('Failed to parse token:', error);
      return null;
    }
  }