// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-lavande flex-grow flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-texte-sombre leading-tight font-title ">
          Retrouvez la sérénité,<br />une tasse à la fois.
        </h1>
        <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
          Découvrez notre collection d'infusions artisanales, conçues pour apporter calme et bien-être à votre quotidien.
        </p>
        <div className="mt-8">
          <Link
            to="/nos-infusions"
            className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-80 transition-all shadow-lg"
          >
            Découvrir notre collection
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;