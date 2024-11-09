"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { useOCAuth } from '@opencampus/ocid-connect-js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { authState } = useOCAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(authState?.isAuthenticated);

  useEffect(() => {
    if (authState) {
      setIsAuthenticated(authState.isAuthenticated);
    }
  }, [authState]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);