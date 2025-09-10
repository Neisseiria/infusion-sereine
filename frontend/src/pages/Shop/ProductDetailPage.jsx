// src/pages/ProductDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import infusionService from '../../api/infusionService.js';
import { useCart } from '../../context/CartContext.jsx';
import toast from 'react-hot-toast';

function ProductDetailPage() {
  const { id } = useParams();
  const [infusion, setInfusion] = useState(null);
  const cart = useCart();

  useEffect(() => {
    const fetchInfusion = async () => {
      try {
        const response = await infusionService.getInfusionById(id);
        setInfusion(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'infusion:", error);
      }
    };
    fetchInfusion();
  }, [id]);

  const handleAddToCart = () => {
    // Vérifie qu'on a bien les données de l'infusion avant de l'ajouter
    if (infusion) { 
      cart.addToCart(infusion);
      toast.success(`${infusion.nom} a été ajouté au panier !`);
    }
  };

  if (!infusion) {
    return <div className="w-full text-center p-12">Chargement du produit...</div>;
  }

  return (
    <div className="w-full bg-lavande p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <img src={infusion.image} alt={infusion.nom} className="w-full h-auto object-cover" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-title text-texte-sombre">{infusion.nom}</h1>
          <p className="text-gray-700 text-lg">{infusion.description}</p>
          <div>
            <h2 className="text-2xl font-title text-accent">Ingrédients</h2>
            <ul className="list-disc list-inside text-gray-600">
              {infusion.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
            </ul>
          </div>
          <div className="text-4xl font-bold text-texte-sombre text-right">
            {infusion.prix.toFixed(2)}€
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-opacity-80 transition-all shadow-lg"
          >
            Ajouter au Panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;