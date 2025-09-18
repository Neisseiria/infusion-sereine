import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import authService from '../../api/authService';

const schema = Yup.object().shape({
  email: Yup.string().email("Format d'email invalide").required("L'email est obligatoire"),
});

function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email }) => {
    try {
      await authService.forgotPassword(email);
      toast.success('Si un compte existe, un email a été envoyé.');
      reset();
    } catch (e) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className="w-full bg-lavande flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-title text-texte-sombre mb-4 text-center">Mot de passe oublié</h1>
        <p className="text-texte-sombre/80 mb-6 text-center">Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" {...register('email')} className="mt-1 w-full input-style" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-opacity-80 transition-all shadow-lg disabled:bg-gray-400">
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le lien'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;


