import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../modules/Auth/services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('q_parkinson_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return !!localStorage.getItem('q_parkinson_user');
    } catch {
      return false;
    }
  });

  const loginUser = async (email, password) => {
    const res = await authService.login(email, password);
    const user = res.user;
    try {
      localStorage.setItem('q_parkinson_user', JSON.stringify(user));
      localStorage.setItem('q_parkinson_token', res.token || '');
    } catch (e) {
      console.warn('LocalStorage access failed:', e);
    }
    setCurrentUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const signupUser = async (signupData) => {
    const res = await authService.signup(signupData);
    // Do NOT automatically set isAuthenticated = true so user must log in after signup
    return res.user;
  };

  const logout = () => {
    try {
      localStorage.removeItem('q_parkinson_user');
      localStorage.removeItem('q_parkinson_token');
    } catch (e) {
      console.warn('LocalStorage clear failed:', e);
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      loginUser,
      signupUser,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
