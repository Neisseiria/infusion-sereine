// src/api/authService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/users/`;

// Configuration axios par défaut pour ce service
const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Envoie les cookies avec chaque requête
});

// Debug interceptor pour voir les requêtes
authAxios.interceptors.request.use(
  (config) => {
    console.log(`AuthService: ${config.method.toUpperCase()} ${config.url}`);
    console.log('Cookies envoyés:', document.cookie);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Debug interceptor pour voir les réponses
authAxios.interceptors.response.use(
  (response) => {
    console.log(`AuthService: Succès ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error(`AuthService: Erreur ${error.response?.status}`, error.response?.data);
    return Promise.reject(error);
  }
);

const register = (userData) => {
  return authAxios.post('register', userData);
};

const login = (userData) => {
  return authAxios.post('login', userData);
};

const logout = () => {
  return authAxios.post('logout');
};

const getCurrentUser = () => {
  return authAxios.get('current-user');
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;