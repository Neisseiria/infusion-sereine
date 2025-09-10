// src/pages/EmailVerificationPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmailVerificationPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Vérification de votre compte en cours...');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // On contacte la route backend pour la vérification
        await axios.get(`${import.meta.env.VITE_API_URL}/api/users/verify/${token}`);
        // Si l'appel réussit, le backend nous redirigera automatiquement.
        // On met un message au cas où la redirection automatique échouerait.
        setMessage('Redirection en cours...');
        
      } catch (error) {
        // Si l'appel API lui-même échoue, on redirige vers la page d'échec
        navigate('/verification-echec');
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, navigate]);

  return (
    <div className="w-full text-center p-12 bg-lavande flex-grow flex flex-col justify-center items-center">
      <h1 className="text-4xl font-title text-texte-sombre mb-4">{message}</h1>
    </div>
  );
}

export default EmailVerificationPage;