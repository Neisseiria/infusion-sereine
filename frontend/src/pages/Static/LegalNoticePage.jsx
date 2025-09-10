import React from 'react';

function LegalNoticePage() {
  return (
    <div className="w-full bg-lavande p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-title text-texte-sombre mb-6">Mentions Légales</h1>
        <em className="text-gray-500">Dernière mise à jour le : 10/09/2025</em>
        
        <div className="space-y-4 text-gray-700 mt-6">
          <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site L'Infusion Sereine l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>

          <h2 className="text-2xl font-title text-accent pt-4">Édition du site</h2>
          <p>
            Le présent site, accessible à l'URL https://infusionsereine.netlify.app/, est édité par :
          </p>
          <p>
            <strong>Infusion Sereine</strong>, résidant au 17 avenue du Thé, 62800 Liévin, de nationalité Française.
            <br />
            Statut : Micro-Entreprise
            <br />
            Numéro SIRET : 888 000 999
            <br />
            Adresse e-mail : contact@infusionsereine.com
            <br />
            Numéro de téléphone : 03 12 34 56 78
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Responsable de la publication</h2>
          <p>
            Le Directeur de la publication du Site est <strong>Infusion Sereine</strong>.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Hébergement</h2>
          <p>
            Le Site est hébergé par la société IONOS SE, située 7 Place de la Gare, 57200 Sarreguemines, France.
            <br />
            (Contact : +33 970 808 911 ou via leur site web).
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Protection des données personnelles (RGPD)</h2>
          <p>
            L'éditeur du site s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site L'Infusion Sereine, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.
          </p>
          <p>
            Chaque formulaire ou téléservice limite la collecte des données personnelles au strict nécessaire (minimisation des données) et indique notamment :
            <ul>
              <li className="ml-4 list-disc">quels sont les objectifs du recueil de ces données ;</li>
              <li className="ml-4 list-disc">si ces données sont obligatoires ou facultatives pour la gestion de votre demande.</li>
            </ul>
          </p>
          <p>
            Conformément à la loi « Informatique et Libertés », vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition de vos données personnelles. Vous pouvez exercer ce droit en nous contactant à l'adresse suivante : contact@infusionsereine.com.
          </p>
          <p>
            Pour plus d'informations sur la manière dont nous traitons vos données, veuillez consulter notre <a href="/politique-de-confidentialite" className="text-accent hover:underline">Politique de Confidentialité</a>.
          </p>
          
          <h2 className="text-2xl font-title text-accent pt-4">Propriété Intellectuelle</h2>
          <p>
            L'ensemble de ce site (contenus, textes, images, vidéos, logos...) est la propriété exclusive de Infusion Sereine ou fait l'objet d'une autorisation d'utilisation. Toute reproduction, représentation, diffusion ou rediffusion, totale ou partielle, du contenu de ce site sur quelque support ou par tout procédé que ce soit, sans l'autorisation expresse de l'éditeur, est interdite et constituerait une contrefaçon sanctionnée par les articles L. 335-2 et suivants du Code de la Propriété Intellectuelle.
          </p>
          
          <h2 className="text-2xl font-title text-accent pt-4">Liens hypertextes</h2>
          <p>
            Le site L'Infusion Sereine peut contenir des liens hypertextes vers d'autres sites. L'éditeur ne peut être tenu pour responsable du contenu de ces sites externes, ni des éventuels préjudices qu'ils pourraient causer. La création de liens hypertextes vers le site L'Infusion Sereine est soumise à l'accord préalable de l'éditeur.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LegalNoticePage;