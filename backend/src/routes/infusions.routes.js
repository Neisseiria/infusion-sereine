// backend/routes/infusions.routes.js
import { Router } from 'express';
import { getAllInfusions, getInfusionById } from '../controllers/infusion.controller.js';

const router = Router();

// Quand une requête GET arrive sur '/', on appelle la fonction getAllInfusions
router.get('/', getAllInfusions);

// Quand une requête GET arrive sur '/:id', on appelle la fonction getInfusionById
router.get('/:id', getInfusionById);

export default router;