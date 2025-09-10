import React from 'react';

function TermsPage() {
  return (
    <div className="w-full bg-lavande p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-title text-texte-sombre mb-6">Conditions Générales de Vente</h1>
        <div className="space-y-4 text-gray-700">
          <h2 className="text-2xl font-title text-accent pt-4">Article 1 : Objet</h2>
          <p>Les présentes conditions régissent les ventes par la société [Votre Nom/Entreprise] de thés et infusions.</p>
          <h2 className="text-2xl font-title text-accent pt-4">Article 2 : Prix</h2>
          <p>Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande)...</p>
          {/* !!!! à modifier !!!!! */}
        </div>
      </div>
    </div>
  );
}

export default TermsPage;