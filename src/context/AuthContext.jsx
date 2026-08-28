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
    return res.user;
  };

  const switchRole = (newRole) => {
    if (!currentUser) {
      const mockUser = { id: `usr_${Date.now()}`, name: 'Demo User', email: `${newRole.toLowerCase()}@qparkinson.org`, role: newRole, status: 'ACTIVE' };
      setCurrentUser(mockUser);
      setIsAuthenticated(true);
      try {
        localStorage.setItem('q_parkinson_user', JSON.stringify(mockUser));
        localStorage.setItem('q_parkinson_token', `q_parkinson_token_${Date.now()}`);
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      return mockUser;
    }
    const updatedUser = { ...currentUser, role: newRole };
    try {
      localStorage.setItem('q_parkinson_user', JSON.stringify(updatedUser));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    setCurrentUser(updatedUser);
    setIsAuthenticated(true);
    return updatedUser;
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
