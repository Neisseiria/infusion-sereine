// backend/utils/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = (user, token) => {
  const rawOrigin = process.env.CLIENT_URLS || process.env.CLIENT_URL || '';
  const firstOrigin = rawOrigin.split(',')[0]?.trim().replace(/\/$/, '');
  const url = `${firstOrigin}/verify-email/${token}`;

  const mailOptions = {
    from: `"L'Infusion Sereine" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Vérifiez votre compte L\'Infusion Sereine',
    html: `
      <h1>Bonjour ${user.firstName},</h1>
      <p>Merci de vous être inscrit sur L'Infusion Sereine !</p>
      <p>Veuillez cliquer sur le lien ci-dessous pour activer votre compte :</p>
      <a href="${url}" style="background-color: #A78BFA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Vérifier mon compte</a>
      <p>Ce lien expirera dans 1 heure.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = (user, token) => {
  const rawOrigin = process.env.CLIENT_URLS || process.env.CLIENT_URL || '';
  const firstOrigin = rawOrigin.split(',')[0]?.trim().replace(/\/$/, '');
  const url = `${firstOrigin}/reset-password/${token}`;

  const mailOptions = {
    from: `"L'Infusion Sereine" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Réinitialisez votre mot de passe',
    html: `
      <h1>Bonjour ${user.firstName},</h1>
      <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
      <p>Cliquez sur le bouton ci-dessous pour en définir un nouveau (lien valable 1 heure) :</p>
      <a href="${url}" style="background-color: #A78BFA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Réinitialiser mon mot de passe</a>
      <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};