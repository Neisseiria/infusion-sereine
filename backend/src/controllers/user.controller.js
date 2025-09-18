// backend/controllers/user.controller.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import TempUser from "../models/tempuser.model.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/email.js";
import crypto from "crypto";

// --- Logique d'Inscription ---
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Veuillez remplir tous les champs." });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: "Le mot de passe doit contenir au moins 6 caractères." });
    }

    const existingUser = await User.findOne({ email });
    const existingTempUser = await TempUser.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ msg: "Un compte avec cet email existe déjà et est actif." });
    }
    if (existingTempUser) {
      return res.status(409).json({ msg: "Ce compte est déjà en attente de vérification. Veuillez consulter vos emails." });
    }

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tempUser = new TempUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      token: verificationToken,
    });
    await tempUser.save();

    await sendVerificationEmail(tempUser, verificationToken);

    res.status(201).json({
      msg: "Inscription presque terminée ! Veuillez consulter vos emails pour vérifier votre compte.",
    });
  } catch (error) {
    console.error("ERREUR DANS LA ROUTE REGISTER:", error);
    res.status(500).json({ error: error.message });
  }
};

// --- Logique de Vérification d'Email ---
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; // 
    if (!token) {
      return res.status(400).json({ msg: "Token manquant." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Idempotence: si déjà vérifié, renvoyer un succès
    const existingUser = await User.findOne({ email: decoded.email });
    if (existingUser) {
      return res.status(200).json({ msg: "Compte déjà vérifié." });
    }

    // Rechercher le compte temporaire correspondant
    const tempUser = await TempUser.findOne({ email: decoded.email, token });
    if (!tempUser) {
      return res.status(400).json({ msg: "Lien invalide ou déjà utilisé." });
    }

    const newUser = new User({
      firstName: tempUser.firstName,
      lastName: tempUser.lastName,
      email: tempUser.email,
      password: tempUser.password,
    });
    await newUser.save();

    await TempUser.deleteOne({ email: tempUser.email });

    res.status(200).json({ msg: "Compte vérifié avec succès !" });
  } catch (error) {
    console.error("ERREUR DE VÉRIFICATION JWT:", error);
    res.status(400).json({ msg: "Lien invalide ou expiré." });
  }
};
// --- Logique de Connexion  ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Veuillez remplir tous les champs." });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ msg: "Identifiants invalides." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Identifiants invalides." });
    }
    
    // On crée le token comme avant
    const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' }
    );
    
    // On envoie le token dans un cookie httpOnly sécurisé
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // Requis pour SameSite=None en prod (HTTPS)
      sameSite: isProduction ? "None" : "Lax", // Cross-site en prod, dev plus permissif
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);

    // On renvoie les infos de l'utilisateur (sans le token, qui est maintenant dans le cookie)
    res.status(200).json({
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
    });
  } catch (err) {
    console.error("ERREUR DANS LA ROUTE LOGIN:", err);
    res.status(500).json({ error: err.message });
  }
};

// --- Vérifier l'Utilisateur Actuel ---
export const currentUser = async (req, res) => {
  try {
    console.log("currentUser appelé");
    console.log("Cookie reçu:", req.cookies.token);
    
    const token = req.cookies.token;
    if (!token) {
      console.log("Pas de token");
      return res.json({ data: null }); // Format cohérent
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé:", decoded);
    
    const user = await User.findById(decoded.id).select('-password');
    console.log("Utilisateur trouvé:", user);

    if (!user) {
      console.log("Utilisateur non trouvé");
      return res.json({ data: null });
    }
    
    console.log("currentUser succès");
    res.status(200).json({ data: user }); // Wrapped dans { data: ... }

  } catch (error) {
    console.error("Erreur currentUser:", error);
    res.json({ data: null });
  }
};
// --- Déconnexion ---
export const logoutUser = async (req, res) => {
  // On efface le cookie
  res.clearCookie("token");
  res.status(200).json({ message: "Déconnexion réussie" });
};

// --- Mot de passe oublié: demande ---
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email requis" });

    const user = await User.findOne({ email });
    if (!user) {
      // Réponse générique pour ne pas divulguer l'existence d'un compte
      return res.status(200).json({ msg: "Si un compte existe, un email a été envoyé." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = expires;
    await user.save();

    // Envoyer l'email
    await sendPasswordResetEmail(user, resetToken);

    return res.status(200).json({ msg: "Si un compte existe, un email a été envoyé." });
  } catch (error) {
    console.error("Erreur forgotPassword:", error);
    return res.status(500).json({ msg: "Erreur interne" });
  }
};

// --- Mot de passe oublié: réinitialisation ---
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) return res.status(400).json({ msg: "Token manquant" });
    if (!password || password.length < 6) {
      return res.status(400).json({ msg: "Mot de passe invalide (min 6 caractères)" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Lien invalide ou expiré." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ msg: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error("Erreur resetPassword:", error);
    return res.status(500).json({ msg: "Erreur interne" });
  }
};