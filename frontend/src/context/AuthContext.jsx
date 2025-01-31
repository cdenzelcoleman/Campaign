import React, { createContext, useState, useEffect } from 'react';
import { signUp, logIn } from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  function getUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Token is not in the correct JWT format.');
        localStorage.removeItem('token');
        return null;
      }
  
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return null;
      }
      return payload.user;
    } catch (error) {
      console.error('Failed to parse token:', error);
      localStorage.removeItem('token');
      return null;
    }
  }

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
    try {
      const response = await signUp(userData);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error; 
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await logIn(credentials); 
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signup: handleSignup, login: handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
