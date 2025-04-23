// utils/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getToken, storeToken, removeToken } from './auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = await getToken();
      if (savedToken) {
        setToken(savedToken);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (tokenValue) => {
    await storeToken(tokenValue);
    setToken(tokenValue);
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
