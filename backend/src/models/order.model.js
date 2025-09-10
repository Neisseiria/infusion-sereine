// backend/src/models/order.model.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

// On définit d'abord à quoi ressemble un article à l'intérieur d'une commande
const OrderItemSchema = new Schema({
  product: { 
    type: Schema.Types.ObjectId, 
    ref: 'Infusion', // Fait référence à un produit de notre collection d'infusions
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  } // On stocke le prix au moment de l'achat
});

// Ensuite, on définit la commande elle-même
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // Fait référence à un utilisateur
    ref: 'User',                 // Le modèle 'User'
    required: true
  },
  items: [OrderItemSchema], // Un tableau d'articles, basé sur le schéma ci-dessus
  totalAmount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true // Ajoute automatiquement la date de création
});

const Order = mongoose.model('Order', orderSchema);
export default Order;