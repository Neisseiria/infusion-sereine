import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/reviews"; 

// Récupérer les avis d’un produit
export const getReviews = async (productId) => {
  const { data } = await axios.get(`${API_URL}/${productId}`, {
    withCredentials: true, // pour envoyer les cookies si besoin
  });
  return data;
};

// Ajouter un avis
export const addReview = async (productId, values) => {
  const { data } = await axios.post(`${API_URL}/${productId}`, values, {
    withCredentials: true,
  });
  return data;
};
