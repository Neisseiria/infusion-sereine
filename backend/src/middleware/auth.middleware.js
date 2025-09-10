// backend/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // On lit le token depuis le cookie httpOnly
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'Accès non autorisé, token manquant.' });
  }

  try {
    // On vérifie le token avec notre clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // On attache l'ID de l'utilisateur à la requête pour les prochains contrôleurs
    req.user = { id: decoded.id };
    
    // Tout est bon, on laisse passer la requête
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token invalide.' });
  }
};

export default authMiddleware;