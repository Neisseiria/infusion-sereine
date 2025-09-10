// src/App.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // On utilise le nouveau système de notifications
import CookieConsent from "react-cookie-consent"; 

// On importe nos composants depuis leurs nouveaux emplacements
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex">
        <Outlet />
      </main>
      <Footer />

      <Toaster position="bottom-right" />

      <CookieConsent
        location="bottom"
        buttonText="J'accepte"
        cookieName="infusionSereineCookieConsent"
        style={{ background: "#2D3748" }}
        buttonStyle={{ background: "#E6EFA", color: "#2D3748", fontSize: "14px", borderRadius: "8px" }}
        expires={150}
      >
        Ce site utilise des cookies pour améliorer l'expérience utilisateur.{" "}
        <Link to="/politique-de-confidentialite" style={{ color: "#A78BFA" }}>En savoir plus.</Link>
      </CookieConsent>
    </div>
  );
}

export default App;