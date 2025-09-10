// src/pages/Cart/CartPage.jsx

import React from 'react';
import { useCart } from '../../context/CartContext.jsx'; 
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="w-full text-center p-12 bg-lavande">
        <h1 className="text-4xl font-title text-texte-sombre mb-4">Votre panier est vide</h1>
        <p className="text-lg text-gray-600 mb-8">Parcourez nos collections pour trouver votre prochaine infusion favorite.</p>
        <Link to="/nos-infusions" className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-80 transition-all shadow-lg">
          Découvrir nos infusions
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-lavande p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-title text-texte-sombre mb-8 text-center">Votre Panier</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.nom} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <div>
                    <h2 className="text-xl font-title text-texte-sombre">{item.nom}</h2>
                    <p className="text-gray-500">{item.prix.toFixed(2)}€</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <button onClick={() => updateQuantity(item._id, -1)} className="px-3 py-1 text-lg font-bold hover:bg-lavande rounded-l-md">-</button>
                    <span className="px-3 py-1 text-lg">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} className="px-3 py-1 text-lg font-bold hover:bg-lavande rounded-r-md">+</button>
                  </div>
                  <span className="text-lg font-bold text-texte-sombre w-20 text-right">
                    {(item.prix * item.quantity).toFixed(2)}€
                  </span>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-7-00">
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-end items-center">
            <span className="text-2xl font-bold text-texte-sombre">Total : {total.toFixed(2)}€</span>
            <button className="ml-6 bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-80 transition-all shadow-lg">
              Passer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;