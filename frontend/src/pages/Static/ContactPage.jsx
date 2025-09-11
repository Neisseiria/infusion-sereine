// src/pages/Static/ContactPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import contactService from '../../api/contactService.js';

// On définit le schéma de validation avec Yup
const contactSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est obligatoire'),
  email: Yup.string().email("Format d'email invalide").required("L'email est obligatoire"),
  message: Yup.string().min(10, 'Votre message doit faire au moins 10 caractères').required('Le message est obligatoire'),
});

function ContactPage() {
  // On configure React Hook Form
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await contactService.sendMessage(data);
      toast.success(response.data.msg);
      reset(); // On vide le formulaire après succès
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
            <input type="text" {...register("name")} className="mt-1 w-full input-style" />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} className="mt-1 w-full input-style" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea {...register("message")} rows="4" className="mt-1 w-full input-style" />
            <p className="text-red-500 text-sm">{errors.message?.message}</p>
          </div>
          <div>
            <button type="submit" disabled={isSubmitting} className="btn-primary bg-pervenche py-2 px-5 w-40 mx-auto block rounded-lg transition-colors duration-300 hover:bg-indigo-400 hover:text-white">
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default ContactPage;