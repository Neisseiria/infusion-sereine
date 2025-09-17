// backend/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Token depuis cookie httpOnly en priorité
  let token = req.cookies?.token;

  // Si absent, on tente un Authorization: Bearer <token>
  if (!token) {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    console.warn('AuthMiddleware: token manquant (ni cookie, ni Authorization header).');
    return res.status(401).json({ msg: 'Accès non autorisé, token manquant.' });
  }

  try {
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Utiliser _id pour correspondre à Mongoose
    req.user = { _id: decoded.id };

    next();
  } catch (err) {
    console.error('AuthMiddleware: erreur de vérification du token:', err?.message);
    return res.status(401).json({ msg: 'Token invalide.' });
  }
};

export default authMiddleware;