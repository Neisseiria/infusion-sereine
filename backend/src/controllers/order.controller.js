// backend/controllers/order.controller.js
import Order from '../models/order.model.js';

export const createOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount } = req.body;
    const userId = req.user.id; // L'ID de l'utilisateur vient de notre middleware d'authentification

    // On s'assure que le panier n'est pas vide
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ msg: "Le panier ne peut pas être vide." });
    }

    // On formate les articles du panier pour notre modèle de commande
    const items = cartItems.map(item => ({
      product: item._id,
      quantity: item.quantity,
      price: item.prix
    }));

    const newOrder = new Order({
      user: userId,
      items: items,
      totalAmount: totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (err) {
    console.error("Erreur lors de la création de la commande:", err);
    res.status(500).json({ error: "Erreur serveur lors de la création de la commande." });
  }
};
