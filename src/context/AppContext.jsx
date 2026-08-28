import { createContext, useContext, useState } from 'react';
import { DEMO_PATIENT, MOCK_RESULTS } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patient, setPatient] = useState(DEMO_PATIENT);
  const [results, setResults] = useState(MOCK_RESULTS);
  const [currentResult, setCurrentResult] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');

  const login = (name) => {
    if (name) setPatient((p) => ({ ...p, name }));
    setIsLoggedIn(true);
    setActivePage('dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActivePage('dashboard');
  };

  const addResult = (result) => {
    setResults((prev) => [result, ...prev]);
    setCurrentResult(result);
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, login, logout, patient, setPatient, results, addResult, currentResult, setCurrentResult, activePage, setActivePage }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
