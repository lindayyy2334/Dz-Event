
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv"); // Pour charger les variables d'environnement
const app = express();
const port = 3000;

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Middleware pour parser les données JSON
app.use(express.json());
app.use(express.static("public"));

// Configurer le transporteur d'email avec Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Utilisation de la variable d'environnement pour l'email
    pass: process.env.GMAIL_PASS, // Utilisation de la variable d'environnement pour le mot de passe
  },
});

// Route POST pour recevoir la demande de devis et envoyer l'email
app.post("/demande-devis", (req, res) => {
  const { nom, email, description, services } = req.body;

  // Vérifier que toutes les informations sont présentes
  if (!nom || !email || !description || !services) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "L'email fourni est invalide." });
  }

  // Configurer le contenu de l'email
  const mailOptions = {
    from: process.env.GMAIL_USER, // Email de l'expéditeur, récupéré depuis la variable d'environnement
    to: email, // Email du destinataire (l'utilisateur)
    subject: "Demande de devis reçue",
    text: `Bonjour ${nom},\n\nNous avons bien reçu votre demande de devis pour les services suivants :\n${services}\n\nDescription du projet :\n${description}\n\nNous reviendrons vers vous dans les plus brefs délais.\n\nCordialement,\nVotre équipe de devis.`,
  };

  // Envoyer l'email avec Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // Afficher l'erreur dans la console pour débogage
      console.error("Erreur lors de l'envoi de l'email:", error);
      return res
        .status(500)
        .json({
          message:
            "Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard.",
          error: error.message,
        });
    }

    // Si l'email est envoyé avec succès
    console.log("Email envoyé:", info.response);
    res.status(200).json({
      message: `Merci ${nom}, votre demande de devis a été envoyée avec succès ! Un email de confirmation a été envoyé à ${email}.`,
    });
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
