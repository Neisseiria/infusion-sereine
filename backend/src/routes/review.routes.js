import express from "express";
import { addReview, getReviews } from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js"; 

const router = express.Router();

// POST = ajouter un avis (utilisateur connecté requis)
router.post("/:productId", authMiddleware, addReview);

// GET = récupérer les avis d’un produit
router.get("/:productId", getReviews);

export default router;
