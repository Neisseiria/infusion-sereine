// src/pages/Auth/AuthPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import authService from '../../api/authService';

// On définit les schémas de validation à l'extérieur du composant
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Format d\'email invalide').required('L\'email est obligatoire'),
  password: Yup.string().required('Le mot de passe est obligatoire'),
});

const signupSchema = Yup.object().shape({
  firstName: Yup.string().required('Le prénom est obligatoire'),
  lastName: Yup.string().required('Le nom est obligatoire'),
  email: Yup.string().email('Format d\'email invalide').required('L\'email est obligatoire'),
  password: Yup.string().min(6, 'Le mot de passe doit faire au moins 6 caractères').required('Le mot de passe est obligatoire'),
});


function AuthPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Configuration de React Hook Form
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(isLoginMode ? loginSchema : signupSchema), // On change le schéma dynamiquement
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
    reset(); // On réinitialise le formulaire en changeant de mode
  };

  // Notre fonction de soumission est maintenant plus simple
  const onSubmit = async (data) => {
    if (isLoginMode) {
      try {
        const response = await authService.login(data);
        auth.login(response.data.user);
        navigate('/');
        toast.success(`Bienvenue, ${response.data.user.firstName} !`);
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Une erreur est survenue.');
      }
    } else { // Mode Inscription
      try {
        const response = await authService.register(data);
        toast.success(response.data.msg);
        switchModeHandler(); // On bascule en mode connexion
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Une erreur est survenue.');
      }
    }
  };

  return (
    <div className="w-full bg-lavande flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-title text-texte-sombre mb-6 text-center">
          {isLoginMode ? 'Connexion' : 'Créer un Compte'}
        </h1>

        {/* Le JSX est maintenant plus direct */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {!isLoginMode && (
            <>
              <div>
                <label htmlFor="firstName">Prénom</label>
                <input type="text" {...register("firstName")} className="mt-1 w-full input-style" />
                <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
              </div>
              <div>
                <label htmlFor="lastName">Nom</label>
                <input type="text" {...register("lastName")} className="mt-1 w-full input-style" />
                <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
              </div>
            </>
          )}

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} className="mt-1 w-full input-style" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" {...register("password")} className="mt-1 w-full input-style" />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-opacity-80 transition-all shadow-lg disabled:bg-gray-400">
            {isSubmitting ? 'Envoi en cours...' : (isLoginMode ? 'Se Connecter' : "S'inscrire")}
          </button>
        </form>

        {isLoginMode && (
          <p className="mt-4 text-center text-sm">
            <button
              onClick={() => navigate('/mot-de-passe-oublie')}
              className="font-semibold text-accent hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </p>
        )}

        <p className="mt-6 text-center text-sm">
          {isLoginMode ? "Pas encore de compte ?" : "Déjà un compte ?"}
          <button onClick={switchModeHandler} className="ml-1 font-semibold text-accent hover:underline">
            {isLoginMode ? "Inscrivez-vous" : "Connectez-vous"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;