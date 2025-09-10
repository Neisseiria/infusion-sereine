// src/pages/AboutPage.jsx
import React from 'react';

function AboutPage() {
  return (
    <div className="w-full bg-lavande p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-title text-texte-sombre mb-6">Notre Histoire</h1>
        <div className="space-y-4 text-gray-700 font-body text-lg">
          <p>
            L'Infusion Sereine est née d'une idée simple : dans un monde qui va toujours plus vite, nous avons tous besoin de nous accorder des moments de pause, de calme et de reconnexion avec nous-mêmes.
          </p>
          <p>
            Passionnés par les bienfaits des plantes et les rituels simples, nous avons parcouru le monde à la recherche des ingrédients les plus purs et les plus savoureux. Chaque mélange que nous proposons est le fruit d'une recherche minutieuse, conçu non seulement pour le plaisir du palais, mais aussi pour apaiser l'esprit et le corps.
          </p>
          <p>
            Nous croyons que chaque tasse de thé est une invitation à un voyage sensoriel, une méditation. C'est cette philosophie que nous souhaitons partager avec vous à travers nos créations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;