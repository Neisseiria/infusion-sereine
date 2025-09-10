// src/api/authService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/users/`;

const register = (userData) => {
  return axios.post(API_URL + 'register', userData);
};

const login = (userData) => {
  return axios.post(API_URL + 'login', userData);
};

const logout = () => {
  return axios.post(API_URL + 'logout');
};

const getCurrentUser = () => {
  return axios.get(API_URL + 'current-user');
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;