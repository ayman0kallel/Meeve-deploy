// AuthContext.js
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState('');

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
