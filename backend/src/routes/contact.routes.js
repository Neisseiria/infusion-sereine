// backend/routes/contact.routes.js
import { Router } from 'express';
import { sendContactEmail } from '../controllers/contact.controller.js';

const router = Router();

router.post('/', sendContactEmail);

export default router;