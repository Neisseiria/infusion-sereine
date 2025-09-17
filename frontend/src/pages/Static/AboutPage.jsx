// src/pages/AboutPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import infusionService from '../../api/infusionService';
import InfusionCard from '../../components/Common/InfusionCard';

function AboutPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await infusionService.getAllInfusions();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const scrollByAmount = (amount) => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-lavande">
      {/* Bloc histoire */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-title text-texte-sombre mb-6">Notre Histoire</h1>
          <div className="space-y-4 text-gray-700 font-body text-lg">
            <p>
              L'Infusion Sereine est née d'une idée simple : dans un monde qui va toujours plus vite, nous avons tous besoin de nous accorder des moments de pause, de calme et de reconnexion avec nous-mêmes.
            </p>
            <p>
              Inspirés par les rituels ancestraux et la richesse des plantes, nous sélectionnons des ingrédients d'exception auprès de producteurs engagés. Chaque création est pensée comme une expérience sensorielle, harmonisant goût, parfum et bienfaits.
            </p>
            <p>
              Notre mission: vous offrir des instants de sérénité, à tout moment de la journée, avec des mélanges respectueux du corps et de la planète.
            </p>
          </div>
        </div>
      </div>

      {/* Valeurs */}
      <div className="max-w-5xl mx-auto px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-pervenche/20">
          <h3 className="font-title text-xl font-semibold text-texte-sombre mb-2">Traçabilité</h3>
          <p className="text-texte-sombre/80">Ingrédients sourcés avec transparence et partenaires sélectionnés.</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-pervenche/20">
          <h3 className="font-title text-xl font-semibold text-texte-sombre mb-2">Artisanat</h3>
          <p className="text-texte-sombre/80">Assemblages réalisés en petites séries pour une qualité constante.</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-pervenche/20">
          <h3 className="font-title text-xl font-semibold text-texte-sombre mb-2">Bien-être</h3>
          <p className="text-texte-sombre/80">Des recettes pensées pour l'équilibre et la détente au quotidien.</p>
        </div>
      </div>

      {/* Carrousel produits */}
      <div className="bg-white/60 border-t border-b border-pervenche/20">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-title font-bold text-texte-sombre">Nos infusions</h2>
            <div className="flex gap-2">
              <button onClick={() => scrollByAmount(-320)} className="px-3 py-2 rounded border border-pervenche/30 bg-white text-texte-sombre hover:border-accent">←</button>
              <button onClick={() => scrollByAmount(320)} className="px-3 py-2 rounded border border-pervenche/30 bg-white text-texte-sombre hover:border-accent">→</button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-white/70 rounded-lg border border-pervenche/20 animate-pulse" />
              ))}
            </div>
          ) : (
            <div ref={scrollerRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
              {products.map((p) => (
                <div key={p._id} className="min-w-[280px] max-w-[280px] snap-start">
                  <InfusionCard infusion={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;