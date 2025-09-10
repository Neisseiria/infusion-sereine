// backend/controllers/infusion.controller.js
import Infusion from '../models/infusion.model.js';

// --- Logique pour récupérer toutes les infusions ---
export const getAllInfusions = async (req, res) => {
  try {
    const infusions = await Infusion.find();
    res.status(200).json(infusions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Logique pour récupérer une seule infusion par son ID ---
export const getInfusionById = async (req, res) => {
  try {
    const infusion = await Infusion.findById(req.params.id);
    if (!infusion) {
      return res.status(404).json({ msg: 'Infusion non trouvée.' });
    }
    res.status(200).json(infusion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};