import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-lavande p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-title text-texte-sombre mb-6">Politique de Confidentialité</h1>
        <em className="text-gray-500">Dernière mise à jour le : 10/09/2025</em>

        <div className="space-y-4 text-gray-700 mt-6">
          <p>
            Bienvenue sur L'Infusion Sereine. Votre vie privée est importante pour nous. Cette politique de confidentialité a pour but de vous informer sur la manière dont nous collectons, utilisons et protégeons vos informations personnelles. Elle s'applique à toutes les informations collectées via notre site web [votre-url.com] (le "Site").
          </p>
          <p>
            Le responsable du traitement des données est Infusion Sereine, joignable à l'adresse contact@infusionsereine.com.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Collecte des informations personnelles</h2>
          <p>Nous collectons différents types d'informations pour diverses finalités afin de vous fournir et d'améliorer notre service.</p>

          <h3 className="text-xl font-semibold text-gray-800 pt-2">1. Informations que vous nous fournissez directement</h3>
          <p>
            Lorsque vous effectuez un achat, créez un compte ou nous contactez via notre formulaire, nous collectons les informations que vous nous communiquez, telles que :
            <ul className="list-disc list-inside ml-4">
              <li>Votre nom et prénom</li>
              <li>Votre adresse de facturation et de livraison</li>
              <li>Votre adresse e-mail</li>
              <li>Les informations de paiement (traitées de manière sécurisée par nos prestataires)</li>
            </ul>
          </p>

          <h3 className="text-xl font-semibold text-gray-800 pt-2">2. Informations collectées automatiquement</h3>
          <p>
            Lorsque vous naviguez sur le Site, nous collectons automatiquement certaines informations sur votre appareil. Ces "Informations sur l'Appareil" incluent :
            <ul className="list-disc list-inside ml-4">
              <li>Des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire.</li>
              <li>Des informations sur les pages que vous visitez et les produits que vous consultez.</li>
              <li>Des informations sur la manière dont vous interagissez avec le Site, collectées à l'aide de cookies et de technologies similaires.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Utilisation de vos informations</h2>
          <p>
            Nous utilisons les informations que nous collectons pour plusieurs finalités :
            <ul className="list-disc list-inside ml-4">
              <li><strong>Fournir et gérer nos services :</strong> Traiter vos commandes, gérer les paiements, organiser les livraisons et vous envoyer les factures et confirmations de commande.</li>
              <li><strong>Communiquer avec vous :</strong> Répondre à vos questions, vous fournir une assistance et vous envoyer des informations relatives à votre commande.</li>
              <li><strong>Améliorer notre Site :</strong> Analyser la manière dont nos clients naviguent sur le Site pour optimiser son ergonomie et sa performance.</li>
              <li><strong>Sécurité :</strong> Protéger notre Site contre la fraude potentielle et les risques de sécurité.</li>
              <li><strong>Marketing (avec votre consentement) :</strong> Vous envoyer des informations sur nos nouveaux produits, offres spéciales ou notre newsletter, si vous avez choisi de les recevoir.</li>
            </ul>
          </p>
          
          <h2 className="text-2xl font-title text-accent pt-4">Partage de vos informations</h2>
          <p>
            Nous ne vendons pas vos informations personnelles. Nous les partageons uniquement avec des tiers qui nous aident à vous fournir nos services, comme :
            <ul className="list-disc list-inside ml-4">
              <li><strong>Les prestataires de paiement :</strong> pour traiter vos achats de manière sécurisée (ex: Stripe, PayPal).</li>
              <li><strong>Les services de livraison :</strong> pour vous expédier vos commandes (ex: La Poste, Colissimo).</li>
              <li><strong>Les plateformes d'analyse :</strong> pour nous aider à comprendre l'utilisation de notre Site (ex: Google Analytics).</li>
            </ul>
            <p className="mt-2">Ces tiers ont accès à vos données personnelles uniquement pour effectuer ces tâches en notre nom et sont tenus de ne pas les divulguer ou les utiliser à d'autres fins.</p>
          </p>
          
          <h2 className="text-2xl font-title text-accent pt-4">Vos droits (conformément au RGPD)</h2>
          <p>
            En tant que résident européen, vous disposez des droits suivants concernant vos données personnelles :
            <ul className="list-disc list-inside ml-4">
                <li>Le droit d'accéder aux informations que nous détenons sur vous.</li>
                <li>Le droit de demander la rectification de vos informations si elles sont inexactes ou incomplètes.</li>
                <li>Le droit de demander la suppression de vos données personnelles ("droit à l'oubli").</li>
                <li>Le droit de limiter le traitement de vos données.</li>
                <li>Le droit à la portabilité de vos données.</li>
                <li>Le droit de vous opposer au traitement de vos données.</li>
            </ul>
            <p className="mt-2">Pour exercer l'un de ces droits, veuillez nous contacter à l'adresse : <strong>contact@infusionsereine.com</strong>.</p>
          </p>
          
          <h2 className="text-2xl font-title text-accent pt-4">Conservation des données</h2>
          <p>
            Nous conservons vos informations personnelles aussi longtemps que nécessaire pour les finalités pour lesquelles elles ont été collectées, notamment pour exécuter nos obligations contractuelles et légales (par exemple, pour la facturation et la comptabilité).
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Sécurité</h2>
          <p>
            La sécurité de vos données est une priorité. Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos informations personnelles contre la perte, le vol, la divulgation ou toute modification non autorisée.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Cookies</h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience de navigation. Un cookie est un petit fichier texte stocké sur votre appareil. Certains cookies sont essentiels au fonctionnement du site, tandis que d'autres sont utilisés à des fins d'analyse ou de marketing. Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti lorsqu'un cookie est envoyé.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Modifications de cette politique</h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous notifierons de tout changement en publiant la nouvelle politique sur cette page. Nous vous conseillons de consulter cette page régulièrement pour prendre connaissance des éventuelles modifications.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Nous contacter</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, n'hésitez pas à nous contacter :
            <br/>
            Par e-mail : <strong>contact@infusionsereine.com</strong>
            <br/>
            Par courrier : <strong>Infusion sereine, 17 avenue du Thé, 62800 Liévin</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
