// src/pages/VerificationFailurePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

function VerificationFailurePage() {
  return (
    <div className="w-full text-center p-12 bg-lavande flex-grow flex flex-col justify-center items-center">
      <FiAlertTriangle size={80} className="text-red-500 mb-6" />
      <h1 className="text-4xl font-title text-texte-sombre mb-4">Échec de la Vérification</h1>
      <p className="text-lg text-gray-600 mb-8">
        Le lien de vérification que vous avez utilisé est invalide ou a expiré. <br/>
        Veuillez réessayer de vous inscrire.
      </p>
      <Link to="/auth" className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-80 transition-all shadow-lg">
        Retour à la page d'inscription
      </Link>
    </div>
  );
}

export default VerificationFailurePage;