import Review from "../models/review.model.js";
import Infusion from "../models/infusion.model.js"; 

// Ajouter un avis
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const review = await Review.create({
      product: productId,
      author: req.user._id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer les avis d’un produit
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate("author", "name") // affiche juste le nom de l’auteur
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
