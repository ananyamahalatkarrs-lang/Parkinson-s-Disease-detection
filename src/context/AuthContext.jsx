import React, { createContext, useContext, useState } from 'react';
import { authService } from '../modules/Auth/services/authService';

const AuthContext = createContext(null);

export const DEFAULT_CLINICIAN_USER = {
  id: 'usr_cli_01',
  name: 'Dr. Aris Thorne',
  email: 'clinician@qparkinson.org',
  role: 'Clinician',
  status: 'ACTIVE'
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(DEFAULT_CLINICIAN_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const loginUser = async (email, password) => {
    const res = await authService.login(email, password);
    setCurrentUser(res.user);
    setIsAuthenticated(true);
    return res.user;
  };

  const signupUser = async (signupData) => {
    const res = await authService.signup(signupData);
    setCurrentUser(res.user);
    setIsAuthenticated(true);
    return res.user;
  };

  const logout = () => {
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
