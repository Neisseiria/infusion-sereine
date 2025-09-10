// --- Dépendances ---
import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

// --- Définition du Composant ---
function Footer() {
  // --- Logique JavaScript ---
 // Variable pour l'année. Evite de faire la maj manuellement
  const currentYear = new Date().getFullYear();
// --- Rendu JSX ---
  return (
    <footer className="bg-white p-6 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto text-center text-gray-500">

        <div className="flex justify-center space-x-6 mb-4">
        </div>

        <div className="flex justify-center space-x-4 mb-4 text-sm">
          {/* Composant Link*/}
          <Link to="/mentions-legales" className="hover:text-accent transition-colors">Mentions Légales</Link>
          <Link to="/politique-de-confidentialite" className="hover:text-accent transition-colors">Politique de Confidentialité</Link>
          <Link to="/cgv" className="hover:text-accent transition-colors">CGV</Link>
        </div>
        {/* Paragraphe de copyright.*/}
        <p>&copy; {currentYear} L'Infusion Sereine. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;