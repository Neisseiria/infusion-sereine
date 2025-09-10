// backend/routes/order.routes.js
import { Router } from 'express';
import { createOrder } from '../controllers/order.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// On applique le middleware à cette route.
// Seul un utilisateur connecté (avec un cookie valide) pourra créer une commande.
router.post('/', authMiddleware, createOrder);

export default router;