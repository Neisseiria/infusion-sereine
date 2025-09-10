// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
function Navbar() {
  const auth = useAuth();
  const { itemCount } = useCart();

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* PARTIE GAUCHE : Logo / Titre */}
        <Link to="/" className="text-2xl font-bold text-accent font-title">
          L'Infusion Sereine
        </Link>

        {/* PARTIE DROITE : Liens de navigation */}
        <div className="flex items-center space-x-8 text-lg text-texte-sombre">
          
          <Link to="/nos-infusions" className="hover:text-accent transition-colors">
            Nos Infusions
          </Link>
          <Link to="/a-propos" className="hover:text-accent transition-colors">
            À Propos
          </Link>
          <Link to="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
          
          <Link to="/panier" className="relative hover:text-accent transition-colors">
            <FiShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {auth.isAuthenticated ? (
            <>
              <span className="font-semibold">Bonjour, {auth.user?.firstName || auth.user?.name}</span>
              <button onClick={auth.logout} title="Déconnexion" className="hover:text-accent transition-colors">
                <FiLogOut size={24} />
              </button>
            </>
          ) : (
            <Link to="/auth" className="hover:text-accent transition-colors">
              <FiUser size={24} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;