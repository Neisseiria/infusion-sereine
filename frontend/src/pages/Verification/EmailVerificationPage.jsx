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
          `${import.meta.env.VITE_API_URL}/users/verify?token=${token}`
        );

        if (res.status === 200) {
          navigate("/verification-succes");
        } else {
          navigate("/verification-echec");
        }
      } catch (error) {
        navigate("/verification-echec");
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
