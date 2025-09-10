import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-lavande p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-title text-texte-sombre mb-6">Politique de Confidentialité</h1>
        <div className="space-y-4 text-gray-700">
          <p>Cette politique de confidentialité décrit comment vos informations personnelles sont collectées, utilisées et partagées lorsque vous visitez ou effectuez un achat sur notre site.</p>
          <h2 className="text-2xl font-title text-accent pt-4">Collecte des informations personnelles</h2>
          <p>Lorsque vous naviguez sur le site, nous collectons automatiquement certaines informations sur votre appareil...</p>
          {/* !!!!!!!A modifier!!!!!!!*/}        
          </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;