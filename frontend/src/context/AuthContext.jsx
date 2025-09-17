// src/context/AuthContext.jsx
import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../api/authService';

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Pour savoir si on a fini de vérifier

  useEffect(() => {
    // Au chargement de l'app, on demande au backend qui est connecté
    const checkLoggedIn = async () => {
      try {
        const response = await authService.getCurrentUser();
        // Le backend renvoie { data: user | null }
        setUser(response?.data?.data ?? null);
      } catch (error) {
        console.error("Non connecté", error);
        setUser(null);
      }
      setIsLoading(false); // La vérification est terminée
    };

    checkLoggedIn();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await authService.logout(); // On appelle le backend pour effacer le cookie
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user, // L'utilisateur est authentifié s'il y a un objet 'user'
  };

  // On n'affiche l'application que lorsque la vérification initiale est terminée
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};