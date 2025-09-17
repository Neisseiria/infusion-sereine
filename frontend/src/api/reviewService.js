// src/api/reviewService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/reviews`;

// Constantes de validation
const VALIDATION_RULES = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  MIN_COMMENT_LENGTH: 1,
  MAX_COMMENT_LENGTH: 500, // Cohérent avec le composant
};

// Classe d'erreur personnalisée pour les reviews
export class ReviewError extends Error {
  constructor(message, code = 'REVIEW_ERROR') {
    super(message);
    this.name = 'ReviewError';
    this.code = code;
  }
}

// Fonction de validation commune
const validateReviewData = (reviewData) => {
  if (!reviewData) {
    throw new ReviewError("Les données de l'avis sont requises", 'MISSING_DATA');
  }

  const { rating, comment } = reviewData;

  // Validation de la note
  if (rating === undefined || rating === null) {
    throw new ReviewError("La note est obligatoire", 'MISSING_RATING');
  }

  if (!Number.isInteger(rating) || rating < VALIDATION_RULES.MIN_RATING || rating > VALIDATION_RULES.MAX_RATING) {
    throw new ReviewError(`La note doit être un nombre entier entre ${VALIDATION_RULES.MIN_RATING} et ${VALIDATION_RULES.MAX_RATING}`, 'INVALID_RATING');
  }

  // Validation du commentaire
  if (!comment || typeof comment !== 'string') {
    throw new ReviewError("Le commentaire est obligatoire", 'MISSING_COMMENT');
  }

  const trimmedComment = comment.trim();
  if (trimmedComment.length < VALIDATION_RULES.MIN_COMMENT_LENGTH) {
    throw new ReviewError("Le commentaire ne peut pas être vide", 'EMPTY_COMMENT');
  }

  if (trimmedComment.length > VALIDATION_RULES.MAX_COMMENT_LENGTH) {
    throw new ReviewError(`Le commentaire ne doit pas dépasser ${VALIDATION_RULES.MAX_COMMENT_LENGTH} caractères`, 'COMMENT_TOO_LONG');
  }

  return { rating, comment: trimmedComment };
};

// Fonction utilitaire pour gérer les erreurs axios
const handleApiError = (error, defaultMessage = "Une erreur est survenue") => {
  if (error.response?.data?.message) {
    throw new ReviewError(error.response.data.message, 'API_ERROR');
  } else if (error.message) {
    throw new ReviewError(error.message, 'NETWORK_ERROR');
  } else {
    throw new ReviewError(defaultMessage, 'UNKNOWN_ERROR');
  }
};

// Récupérer les avis d'un produit
export const getReviews = async (productId) => {
  if (!productId) {
    throw new ReviewError("L'ID du produit est requis", 'MISSING_PRODUCT_ID');
  }

  try {
    const { data } = await axios.get(`${API_URL}/${productId}`, {
      withCredentials: true,
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    handleApiError(error, "Impossible de récupérer les avis");
  }
};

// Ajouter un avis
export const addReview = async (productId, reviewData) => {
  if (!productId) {
    throw new ReviewError("L'ID du produit est requis", 'MISSING_PRODUCT_ID');
  }

  // Validation des données
  const validatedData = validateReviewData(reviewData);

  try {
    const { data } = await axios.post(
      `${API_URL}/${productId}`, 
      validatedData,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis:", error);
    handleApiError(error, "Impossible d'ajouter votre avis");
  }
};

// Supprimer un avis (si l'utilisateur est l'auteur)
export const deleteReview = async (reviewId) => {
  if (!reviewId) {
    throw new ReviewError("L'ID de l'avis est requis", 'MISSING_REVIEW_ID');
  }

  try {
    const { data } = await axios.delete(`${API_URL}/${reviewId}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'avis:", error);
    handleApiError(error, "Impossible de supprimer l'avis");
  }
};

// Récupérer les statistiques des avis d'un produit
export const getReviewStats = async (productId) => {
  if (!productId) {
    throw new ReviewError("L'ID du produit est requis", 'MISSING_PRODUCT_ID');
  }

  try {
    const { data } = await axios.get(`${API_URL}/${productId}/stats`, {
      withCredentials: true,
    });
    
    // Validation de la structure des données retournées
    const defaultStats = {
      averageRating: 0,
      totalReviews: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };

    return {
      averageRating: data.averageRating || defaultStats.averageRating,
      totalReviews: data.totalReviews || defaultStats.totalReviews,
      distribution: { ...defaultStats.distribution, ...data.distribution }
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    // Pour les stats, on peut retourner des valeurs par défaut sans faire échouer l'app
    return {
      averageRating: 0,
      totalReviews: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }
};

// Modifier un avis existant (bonus)
export const updateReview = async (reviewId, reviewData) => {
  if (!reviewId) {
    throw new ReviewError("L'ID de l'avis est requis", 'MISSING_REVIEW_ID');
  }

  // Validation des données
  const validatedData = validateReviewData(reviewData);

  try {
    const { data } = await axios.put(
      `${API_URL}/${reviewId}`,
      validatedData,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.error("Erreur lors de la modification de l'avis:", error);
    handleApiError(error, "Impossible de modifier l'avis");
  }
};

// Exporter les constantes de validation pour usage dans les composants
export { VALIDATION_RULES };