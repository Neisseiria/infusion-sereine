// src/components/Common/ProductReviews.jsx
import React, { useEffect, useState } from "react";
import { getReviews, addReview } from "../../api/reviewService";
import { useAuth } from "../../context/AuthContext";

function ProductReviews({ productId }) {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const data = await getReviews(productId);
        setReviews(data);
      } catch (error) {
        console.error("Erreur lors du chargement des avis:", error);
        setError("Impossible de charger les avis");
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Veuillez écrire un commentaire");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      const newReview = await addReview(productId, { rating, comment: comment.trim() });
      setReviews([newReview, ...reviews]);
      setRating(5);
      setComment("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error);
      setError("Impossible d'ajouter votre avis. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onStarClick(star) : undefined}
            className={`text-xl ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${
              star <= rating ? 'text-accent' : 'text-pervenche/50'
            }`}
            disabled={!interactive}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="animate-pulse font-body">
        <div className="h-8 bg-pervenche/30 rounded mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-pervenche/20 p-4 rounded-lg">
              <div className="h-4 bg-lavande rounded mb-2"></div>
              <div className="h-16 bg-pervenche/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto font-body">
      {/* En-tête avec statistiques */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-title text-texte-sombre mb-4">Avis des clients</h2>
        {reviews.length > 0 && (
          <div className="bg-gradient-to-r from-lavande to-pervenche p-6 rounded-lg border border-pervenche/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-texte-sombre">
                  {getAverageRating()}
                </div>
                <div>
                  {renderStars(Math.round(getAverageRating()))}
                  <p className="text-texte-sombre/70 mt-1">
                    Basé sur {reviews.length} avis
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formulaire d'ajout d'avis */}
      {isAuthenticated ? (
        <div className="bg-white border-2 border-pervenche/30 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="text-xl font-semibold font-title text-texte-sombre mb-4">
            Laissez votre avis
          </h3>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-texte-sombre mb-2">
                Votre note :
              </label>
              {renderStars(rating, true, setRating)}
            </div>

            <div>
              <label className="block text-sm font-medium text-texte-sombre mb-2">
                Votre commentaire :
              </label>
              <textarea
                placeholder="Partagez votre expérience avec ce produit..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border-2 border-pervenche/50 rounded-lg p-4 focus:border-accent focus:outline-none transition-colors resize-none bg-lavande/20"
                rows={4}
                maxLength={500}
              />
              <div className="text-right text-sm text-texte-sombre/60 mt-1">
                {comment.length}/500 caractères
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                isSubmitting || !comment.trim()
                  ? 'bg-pervenche/50 text-texte-sombre/50 cursor-not-allowed'
                  : 'bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Publication...</span>
                </div>
              ) : (
                'Publier mon avis'
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-lavande border-2 border-pervenche rounded-xl p-6 mb-8 text-center">
          <div className="text-accent text-lg font-medium font-title mb-2">
            Connectez-vous pour laisser un avis
          </div>
          <p className="text-texte-sombre/70">
            Partagez votre expérience avec d'autres clients
          </p>
        </div>
      )}

      {/* Liste des avis */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold font-title text-texte-sombre">
          Tous les avis ({reviews.length})
        </h3>
        
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white border border-pervenche/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow hover:border-accent/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pervenche to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {(review.author?.firstName || review.author?.name || "A")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-texte-sombre">
                        {review.author?.firstName || review.author?.name || "Client anonyme"}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-texte-sombre/60">
                          {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-texte-sombre/80 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h4 className="text-xl font-semibold font-title text-texte-sombre mb-2">
              Aucun avis pour l'instant
            </h4>
            <p className="text-texte-sombre/60">
              Soyez le premier à donner votre avis sur ce produit !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;