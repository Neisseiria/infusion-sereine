// src/components/Common/ProductReviews.jsx
import React, { useEffect, useState } from "react";
import { getReviews, addReview } from "../../api/reviewService";
import { useAuth } from "../../context/AuthContext";

function ProductReviews({ productId }) {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getReviews(productId);
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = await addReview(productId, { rating, comment });
      setReviews([newReview, ...reviews]);
      setRating(5);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Avis des clients</h2>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label>Note :</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="ml-2 border rounded px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} ⭐</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Votre commentaire..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2"
          />
          <button type="submit" className="bg-accent text-white px-4 py-2 rounded">
            Publier
          </button>
        </form>
      ) : (
        <p className="text-gray-600 mb-4">Connectez-vous pour laisser un avis.</p>
      )}

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div key={r._id} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">{r.author?.name || "Anonyme"} — {r.rating} ⭐</p>
              <p>{r.comment}</p>
              <p className="text-xs text-gray-500">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>Aucun avis pour ce produit.</p>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
