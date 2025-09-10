import React from 'react';

function LegalNoticePage() {
  return (
    <div className="w-full bg-lavande p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-title text-texte-sombre mb-6">Mentions Légales</h1>
        <div className="space-y-4 text-gray-700">
          <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site L'Infusion Sereine l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>
          <h2 className="text-2xl font-title text-accent pt-4">Édition du site</h2>
          <p>Le présent site, accessible à l'URL [votre-url.com], est édité par : [Votre Nom/Nom de l'entreprise], résidant [Votre Adresse], de nationalité Française.</p>
          <h2 className="text-2xl font-title text-accent pt-4">Hébergement</h2>
          <p>Le Site est hébergé par la société IONOS, situé 7 Place de la Gare, 57200 Sarreguemines, (contact téléphonique ou email : +33970808911).</p>
          {/* à modfier */}
        </div>
      </div>
    </div>
  );
}

export default LegalNoticePage;