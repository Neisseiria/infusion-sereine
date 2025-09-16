// src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

function Navbar() {
  const auth = useAuth();
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-accent font-title">
          L'Infusion Sereine
        </Link>

        {/* Liens Desktop */}
        <div className="hidden md:flex items-center space-x-8 text-lg text-texte-sombre font-medium">
          <NavLink to="/nos-infusions" className="hover:text-accent transition-colors">
            Nos Infusions
          </NavLink>
          <NavLink to="/a-propos" className="hover:text-accent transition-colors">
            À Propos
          </NavLink>
          <NavLink to="/contact" className="hover:text-accent transition-colors">
            Contact
          </NavLink>

          {/* Panier (icône seulement en desktop) */}
          <NavLink to="/panier" className="hover:text-accent transition-colors relative">
            <FiShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </NavLink>

          {/* Auth (icône seulement en desktop) */}
          {auth.isAuthenticated ? (
            <>
              <span className="font-semibold">
                Bonjour, {auth.user?.firstName || auth.user?.name}
              </span>
              <button
                onClick={auth.logout}
                title="Déconnexion"
                className="hover:text-accent transition-colors"
              >
                <FiLogOut size={24} />
              </button>
            </>
          ) : (
            <NavLink to="/auth" className="hover:text-accent transition-colors">
              <FiUser size={24} />
            </NavLink>
          )}
        </div>

        {/* Bouton Burger Mobile */}
        <button
          className="md:hidden text-2xl text-texte-sombre"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menu Mobile (texte uniquement) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md flex flex-col items-center py-6 space-y-6 text-lg text-texte-sombre font-medium">
          <NavLink
            to="/nos-infusions"
            onClick={() => setIsOpen(false)}
            className="hover:text-accent"
          >
            Nos Infusions
          </NavLink>
          <NavLink
            to="/a-propos"
            onClick={() => setIsOpen(false)}
            className="hover:text-accent"
          >
            À Propos
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-accent"
          >
            Contact
          </NavLink>

          {/* Panier (texte seulement en mobile) */}
          <NavLink
            to="/panier"
            onClick={() => setIsOpen(false)}
            className="hover:text-accent relative"
          >
            Panier
            {itemCount > 0 && (
              <span className="absolute -top-3 -right-8 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </NavLink>

          {/* Auth (texte seulement en mobile) */}
          {auth.isAuthenticated ? (
            <button
              onClick={() => {
                auth.logout();
                setIsOpen(false);
              }}
              className="hover:text-accent"
            >
              Déconnexion
            </button>
          ) : (
            <NavLink
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="hover:text-accent"
            >
              Connexion
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
