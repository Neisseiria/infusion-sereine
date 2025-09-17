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
    
    // ✅ Correction : utiliser _id pour être cohérent avec MongoDB/Mongoose
    req.user = { _id: decoded.id };
    
    // Tout est bon, on laisse passer la requête
    next();
  } catch (err) {
    console.error('Erreur de vérification du token:', err);
    return res.status(401).json({ msg: 'Token invalide.' });
  }
};

export default authMiddleware;