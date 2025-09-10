import React from 'react';

function TermsPage() {
  return (
    <div className="w-full bg-lavande p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-title text-texte-sombre mb-6">
          Conditions Générales de Vente
        </h1>
        <div className="space-y-4 text-gray-700">
          
          <h2 className="text-2xl font-title text-accent pt-4">Article 1 : Objet</h2>
          <p>
            Les présentes conditions générales de vente (CGV) régissent les ventes effectuées par 
            <strong> Infusion Sereine</strong>, dont le siège social est situé au 
            <strong> 17 avenue du Thé, 62800 Liévin</strong>, et joignable à l'adresse e-mail : 
            <strong> contact@infusionsereine.com</strong>.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 2 : Prix</h2>
          <p>
            Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire. 
            Les frais de traitement et d'expédition sont indiqués lors du processus de commande.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 3 : Commandes</h2>
          <p>
            Toute commande passée sur le site <strong>Infusion Sereine</strong> constitue l'acceptation pleine et entière des présentes CGV. 
            La société se réserve le droit de refuser ou d'annuler toute commande en cas de litige avec le client, de défaut de paiement ou pour tout motif légitime.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 4 : Paiement</h2>
          <p>
            Le paiement est exigible immédiatement à la commande, y compris pour les produits en précommande. 
            Les paiements sont effectués par carte bancaire, PayPal ou tout autre moyen indiqué sur le site. 
            Les transactions sont sécurisées grâce aux prestataires de paiement partenaires.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 5 : Livraison</h2>
          <p>
            Les produits sont expédiés à l'adresse de livraison indiquée lors de la commande. 
            Infusion Sereine ne saurait être tenue responsable des retards de livraison imputables au transporteur. 
            Les délais de livraison sont donnés à titre indicatif.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 6 : Droit de rétractation</h2>
          <p>
            Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétractation, 
            sans avoir à justifier de motifs ni à payer de pénalités. 
            Les retours doivent être effectués dans leur état d'origine et complets (emballage, accessoires, notice...). 
            Les frais de retour sont à la charge du client.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 7 : Garanties</h2>
          <p>
            Tous nos produits bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés. 
            En cas de non-conformité d'un produit vendu, il pourra être retourné, échangé ou remboursé.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 8 : Responsabilité</h2>
          <p>
            Infusion Sereine ne saurait être tenue responsable des dommages résultant d'une mauvaise utilisation du produit acheté. 
            La responsabilité de la société est limitée au montant de la commande.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 9 : Propriété intellectuelle</h2>
          <p>
            Tous les éléments du site Infusion Sereine sont et restent la propriété intellectuelle et exclusive de la société. 
            Nul n'est autorisé à reproduire, exploiter, rediffuser ou utiliser à quelque titre que ce soit, 
            même partiellement, des éléments du site qu'ils soient logiciels, visuels ou sonores.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 10 : Données personnelles</h2>
          <p>
            Infusion Sereine s'engage à protéger vos données personnelles. 
            Pour plus de détails, veuillez consulter notre <a href="/politique-de-confidentialite" className="text-accent hover:underline">Politique de confidentialité</a>.
          </p>

          <h2 className="text-2xl font-title text-accent pt-4">Article 11 : Droit applicable</h2>
          <p>
            Les présentes conditions sont soumises au droit français. 
            En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. 
            À défaut, les tribunaux français seront seuls compétents.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
