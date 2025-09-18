import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import authService from '../../api/authService';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const schema = Yup.object().shape({
  password: Yup.string().min(6, 'Minimum 6 caractères').required('Mot de passe requis'),
  confirm: Yup.string().oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas').required('Confirmation requise'),
});

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ password }) => {
    try {
      await authService.resetPassword(token, password);
      toast.success('Votre mot de passe a été réinitialisé.');
      reset();
      setTimeout(() => navigate('/auth'), 1200);
    } catch (e) {
      toast.error("Lien invalide ou expiré");
    }
  };

  return (
    <div className="w-full bg-lavande flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-title text-texte-sombre mb-4 text-center">Réinitialiser le mot de passe</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password">Nouveau mot de passe</label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                {...register('password')}
                className="w-full input-style pr-10"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-texte-sombre/70 hover:text-accent"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
          <div>
            <label htmlFor="confirm">Confirmer le mot de passe</label>
            <div className="mt-1 relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                {...register('confirm')}
                className="w-full input-style pr-10"
              />
              <button
                type="button"
                aria-label={showConfirm ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-texte-sombre/70 hover:text-accent"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <p className="text-red-500 text-sm">{errors.confirm?.message}</p>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-opacity-80 transition-all shadow-lg disabled:bg-gray-400">
            {isSubmitting ? 'Envoi en cours...' : 'Valider'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;


