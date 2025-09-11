// src/api/infusionService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/infusions/`;

// Fonction pour récupérer toutes les infusions
const getAllInfusions = () => {
  return axios.get(API_URL);
};

// Fonction pour récupérer une seule infusion par son ID
const getInfusionById = (id) => {
  return axios.get(API_URL + id);
};

const infusionService = {
  getAllInfusions,
  getInfusionById,
};

export default infusionService;