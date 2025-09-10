import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EmailVerificationPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Vérification de votre compte en cours...");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/verify?token=${token}`,
          { withCredentials: true } // ✅ pour envoyer cookies si jamais login direct plus tard
        );

        if (res.status === 200) {
          setMessage("✅ Compte vérifié avec succès !");
          setTimeout(() => navigate("/verification-succes"), 1500);
        } else {
          setMessage("❌ Erreur de vérification.");
          setTimeout(() => navigate("/verification-echec"), 1500);
        }
      } catch (error) {
        setMessage("❌ Erreur de vérification.");
        setTimeout(() => navigate("/verification-echec"), 1500);
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
