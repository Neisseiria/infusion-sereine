// src/pages/Static/ContactPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import contactService from '../../api/contactService.js';

// Schéma de validation avec RGPD obligatoire
const contactSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est obligatoire'),
  email: Yup.string().email("Format d'email invalide").required("L'email est obligatoire"),
  message: Yup.string().min(10, 'Votre message doit faire au moins 10 caractères').required('Le message est obligatoire'),
  rgpd: Yup.boolean().oneOf([true], 'Vous devez accepter la Politique de confidentialité pour envoyer le formulaire'),
});

function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const rgpdChecked = watch('rgpd', false);

  const onSubmit = async (data) => {
    try {
      const response = await contactService.sendMessage(data);
      toast.success(response.data.msg);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.error || "Une erreur est survenue.");
    }
  };

  return (
    <div className="w-full bg-lavande flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-title text-texte-sombre mb-6 text-center">Contactez-nous</h1>
        <p className="text-center text-gray-600 mb-8">
          Une question, une suggestion ? N'hésitez pas à nous laisser un message.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div>
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1 w-full input-style"
              aria-invalid={!!errors.name}
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 w-full input-style"
              aria-invalid={!!errors.email}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register("message")}
              rows="4"
              className="mt-1 w-full input-style"
              aria-invalid={!!errors.message}
            />
            <p className="text-red-500 text-sm">{errors.message?.message}</p>
          </div>

          {/* Bloc RGPD */}
          <div className="flex items-start gap-3">
            <input
              id="rgpd"
              type="checkbox"
              {...register("rgpd")}
              className="mt-1 h-3 w-3 rounded-sm border-gray-300 accent-indigo-600"
              aria-invalid={!!errors.rgpd}
            />
            <label htmlFor="rgpd" className="text-sm text-gray-700 leading-5">
              En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées
              dans le cadre de ma demande. Pour plus d'infos, consultez la{' '}
              <NavLink to="/PrivacyPolicyPage" className="underline text-accent hover:opacity-80">
                Politique de confidentialité
              </NavLink>.
            </label>
          </div>
          <p className="text-red-500 text-sm">{errors.rgpd?.message}</p>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !rgpdChecked}
              className="btn-primary bg-pervenche py-2 px-5 w-40 mx-auto block rounded-lg transition-colors duration-300 hover:bg-indigo-400 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
