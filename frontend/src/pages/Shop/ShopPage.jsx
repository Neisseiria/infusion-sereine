// src/pages/ShopPage.jsx

import React, { useState, useEffect } from 'react';
import infusionService from '../../api/infusionService.js';
import InfusionCard from '../../components/Common/InfusionCard.jsx';

function ShopPage() {

  const [infusions, setInfusions] = useState([]);

  useEffect(() => {
    const fetchInfusions = async () => {
      try {
        // On appelle l'endpoint qui retourne TOUTES les infusions.
        const response = await infusionService.getAllInfusions();
        // On met à jour l'état avec le tableau de données reçu.
        setInfusions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des infusions:", error);
      }
    };
    fetchInfusions();

  }, []);

  // --- Rendu JSX ---
  return (
    <div className="bg-lavande min-h-screen p-8 font-sans w-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-texte-sombre text-center mb-12 font-title">
          Notre Collection
        </h1>

        {/* Grille d'affichage des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {infusions.length > 0 ? (
            infusions.map((infusion) => (
              <InfusionCard key={infusion._id} infusion={infusion} />
            ))
          ) : (
            <p className="col-span-full text-center">Chargement des infusions...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;