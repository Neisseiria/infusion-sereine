// backend/controllers/contact.controller.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ msg: "Veuillez remplir tous les champs." });
    }

    const mailOptions = {
      from: `"${name}" <${email}>`, // Formatage pour afficher le nom de l'expéditeur
      to: process.env.EMAIL_USER,
      subject: `Nouveau message de ${name} via le formulaire de contact`,
      html: `
        <h3>Nouveau message reçu depuis le site L'Infusion Sereine</h3>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email de contact :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Votre message a bien été envoyé !" });

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'envoi de l'email." });
  }
};
