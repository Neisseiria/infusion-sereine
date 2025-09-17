// src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import infusionService from '../../api/infusionService';
import InfusionCard from '../../components/Common/InfusionCard';
import { FiTruck, FiStar, FiPackage } from 'react-icons/fi';

// Icônes via react-icons

function HomePage() {
  return (
    <div className="bg-lavande flex-grow">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-28 md:pb-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-texte-sombre leading-tight font-title ">
            Retrouvez la sérénité,<br />une tasse à la fois.
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Découvrez notre collection d'infusions artisanales, conçues pour apporter calme et bien-être à votre quotidien.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/nos-infusions"
              className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg"
            >
              Découvrir nos infusions
            </Link>
            <Link
              to="/a-propos"
              className="bg-white text-texte-sombre font-bold py-3 px-8 rounded-full text-lg border-2 border-pervenche/40 hover:border-accent transition-all shadow"
            >
              Notre histoire
            </Link>
          </div>
        </div>
      </div>

      {/* Bandeau avantages */}
      <div className="bg-white/70 border-y border-pervenche/20">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-lg border border-pervenche/20 bg-white">
            <div className="text-accent text-3xl">
              <FiTruck />
            </div>
            <div>
              <p className="font-title font-semibold text-texte-sombre">Livraison rapide</p>
              <p className="text-sm text-texte-sombre/70">Expédition sous 24/48h en France</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg border border-pervenche/20 bg-white">
            <div className="text-accent text-3xl">
              <FiStar />
            </div>
            <div>
              <p className="font-title font-semibold text-texte-sombre">Produit de qualité</p>
              <p className="text-sm text-texte-sombre/70">Ingrédients sélectionnés avec soin</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg border border-pervenche/20 bg-white">
            <div className="text-accent text-3xl">
              <FiPackage />
            </div>
            <div>
              <p className="font-title font-semibold text-texte-sombre">Emballé avec soin</p>
              <p className="text-sm text-texte-sombre/70">Protégeant arômes et fraîcheur</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bandeau CTA */}
      <div className="bg-gradient-to-r from-lavande to-pervenche border-t border-pervenche/20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-title font-bold text-texte-sombre mb-3">Des infusions pour chaque moment</h3>
            <p className="text-texte-sombre/80">Détente du soir, énergie douce du matin, digestion légère... trouvez l'infusion qui vous accompagne au quotidien.</p>
          </div>
          <div className="text-right">
            <Link to="/nos-infusions" className="inline-block bg-white text-texte-sombre font-bold py-3 px-8 rounded-full border-2 border-pervenche/40 hover:border-accent transition-all shadow">
              Parcourir la boutique
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;