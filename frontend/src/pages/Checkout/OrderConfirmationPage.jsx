// src/pages/Checkout/OrderConfirmationPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

function OrderConfirmationPage() {
  return (
    <div className="w-full text-center p-12 bg-lavande flex-grow flex flex-col justify-center items-center">
      <FiCheckCircle size={80} className="text-green-500 mb-6" />
      <h1 className="text-4xl font-title text-texte-sombre mb-4">Merci pour votre commande !</h1>
      <p className="text-lg text-gray-600 mb-8">
        Votre commande a bien été enregistrée. Vous pourrez bientôt la suivre dans votre espace "Mon Compte".
      </p>
      <Link to="/nos-infusions" className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-80 transition-all shadow-lg">
        Continuer mes achats
      </Link>
    </div>
  );
}

export default OrderConfirmationPage;