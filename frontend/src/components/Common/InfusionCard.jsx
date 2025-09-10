// src/components/InfusionCard.jsx

// --- Dépendances ---
import React from 'react'; //Base React 
import { Link } from 'react-router-dom';

// --- Définition du Composant ---
function InfusionCard({ infusion }) {
   // --- Rendu JSX ---
  return (
    <Link to={`/infusion/${infusion._id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <img src={infusion.image} alt={infusion.nom} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-texte-sombre mb-2 font-title">{infusion.nom}</h3>
          <p className="text-gray-600 mb-4">{infusion.bienfaits}</p>
          <div className="text-right text-xl font-bold text-accent">
            {infusion.prix.toFixed(2)}€
          </div>
        </div>
      </div>
    </Link>
  );
}

export default InfusionCard;