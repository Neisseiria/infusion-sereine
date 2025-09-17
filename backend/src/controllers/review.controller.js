import Review from "../models/review.model.js";
import Infusion from "../models/infusion.model.js"; 

// Ajouter un avis
export const addReview = async (req, res) => {
  try {
    console.log("=== DEBUG addReview ===");
    console.log("req.user:", req.user);
    console.log("req.cookies:", req.cookies);
    console.log("req.headers.authorization:", req.headers.authorization);
    
    const { rating, comment } = req.body;
    const { productId } = req.params;
    
    console.log("Données reçues:");
    console.log("- productId:", productId);
    console.log("- rating:", rating);
    console.log("- comment:", comment);
    console.log("- req.user._id:", req.user._id);

    const review = await Review.create({
      product: productId,
      author: req.user._id,
      rating,
      comment,
    });

    // Recharger avec l'auteur peuplé pour retourner le prénom directement
    const populated = await Review.findById(review._id)
      .populate("author", "firstName lastName")
      .exec();

    console.log("Avis créé avec succès:", populated);
    res.status(201).json(populated);
  } catch (error) {
    console.error(" Erreur dans addReview:", error);
    console.error("Stack trace:", error.stack);
    res.status(400).json({ message: error.message });
  }
};

// Récupérer les avis d'un produit
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("=== DEBUG getReviews ===");
    console.log("Récupération des avis pour le produit:", productId);
    
    const reviews = await Review.find({ product: productId })
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 });

    console.log(` ${reviews.length} avis trouvés pour le produit ${productId}`);
    res.json(reviews);
  } catch (error) {
    console.error(" Erreur dans getReviews:", error);
    res.status(400).json({ message: error.message });
  }
};