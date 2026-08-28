import React, { createContext, useContext, useState } from 'react';
import { authService } from '../modules/Auth/services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Require explicit login by default so entry always lands on Login page first
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem('q_parkinson_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return !!sessionStorage.getItem('q_parkinson_user');
    } catch {
      return false;
    }
  });

  const loginUser = async (email, password) => {
    const res = await authService.login(email, password);
    const user = res.user;
    try {
      sessionStorage.setItem('q_parkinson_user', JSON.stringify(user));
      sessionStorage.setItem('q_parkinson_token', res.token || '');
      localStorage.setItem('q_parkinson_user', JSON.stringify(user));
      localStorage.setItem('q_parkinson_token', res.token || '');
    } catch (e) {
      console.warn('Session storage write failed:', e);
    }
    setCurrentUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const signupUser = async (signupData) => {
    const res = await authService.signup(signupData);
    return res.user;
  };

  const switchRole = (newRole) => {
    const mockUser = currentUser
      ? { ...currentUser, role: newRole }
      : { id: `usr_${Date.now()}`, name: 'Demo User', email: `${newRole.toLowerCase()}@qparkinson.org`, role: newRole, status: 'ACTIVE' };

    try {
      sessionStorage.setItem('q_parkinson_user', JSON.stringify(mockUser));
      sessionStorage.setItem('q_parkinson_token', `q_parkinson_token_${Date.now()}`);
      localStorage.setItem('q_parkinson_user', JSON.stringify(mockUser));
      localStorage.setItem('q_parkinson_token', `q_parkinson_token_${Date.now()}`);
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    return mockUser;
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('q_parkinson_user');
      sessionStorage.removeItem('q_parkinson_token');
      localStorage.removeItem('q_parkinson_user');
      localStorage.removeItem('q_parkinson_token');
    } catch (e) {
      console.warn('Storage clear failed:', e);
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
      switchRole,
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
