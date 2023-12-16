// AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Récupérer le token depuis le localStorage lors du chargement initial
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const saveToken = (token) => {
    setAccessToken(token);
    // Stocker le token dans localStorage pour une persistance
    localStorage.setItem('accessToken', token);
  };

  const removeToken = () => {
    setAccessToken('');
    // Supprimer le token du localStorage
    localStorage.removeItem('accessToken');
  };

  const value = {
    accessToken,
    saveToken,
    removeToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
