// src/pages/ShopPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import infusionService from '../../api/infusionService.js';
import InfusionCard from '../../components/Common/InfusionCard.jsx';

function ShopPage() {

  const [infusions, setInfusions] = useState([]);
  const [sortBy, setSortBy] = useState(''); // '', 'name-asc', 'name-desc', 'price-asc', 'price-desc'

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

  const sortedInfusions = useMemo(() => {
    const copy = [...infusions];
    switch (sortBy) {
      case 'name-asc':
        return copy.sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' }));
      case 'name-desc':
        return copy.sort((a, b) => b.nom.localeCompare(a.nom, 'fr', { sensitivity: 'base' }));
      case 'price-asc':
        return copy.sort((a, b) => (a.prix || 0) - (b.prix || 0));
      case 'price-desc':
        return copy.sort((a, b) => (b.prix || 0) - (a.prix || 0));
      default:
        return copy;
    }
  }, [infusions, sortBy]);

  // --- Rendu JSX ---
  return (
    <div className="bg-lavande min-h-screen p-8 font-sans w-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-texte-sombre text-center mb-12 font-title">
          Notre Collection
        </h1>

        {/* Barre d'actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="text-texte-sombre/80">
            {infusions.length} produits
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-texte-sombre/80">Trier par</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-pervenche/40 rounded-lg bg-white px-3 py-2 focus:outline-none focus:border-accent"
            >
              <option value="">Par défaut</option>
              <option value="name-asc">Nom A → Z</option>
              <option value="name-desc">Nom Z → A</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Grille d'affichage des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedInfusions.length > 0 ? (
            sortedInfusions.map((infusion) => (
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