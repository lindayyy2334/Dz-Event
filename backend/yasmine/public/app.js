import express from "express";
import bodyParser from "body-parser";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./././.env" }); 
const app = express();
const PORT = 3000;

// Middleware pour analyser les données JSON
app.use(bodyParser.json());

// Servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(path.resolve(), "public")));

// Configuration du transporteur pour envoyer l'email
const transporter = nodemailer.createTransport({
  service: "gmail", // Utilisez un service d'email comme Gmail
  auth: {
    user: process.env.GMAIL_USER, // Remplacez par votre email
    pass: process.env.GMAIL_PASS, // Remplacez par votre mot de passe ou un mot de passe d'application
  },
});

// Route pour traiter la demande de devis
app.post("/demande-devis", (req, res) => {
  const { nom, email, description, services } = req.body;

  if (!nom || !email || !description || !services) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  // Créer le contenu de l'email
  const mailOptions = {
    from: "votre_email@gmail.com", // L'email d'expéditeur
    to: "destinataire_email@example.com", // L'email du destinataire (vous)
    subject: "Demande de devis", // Sujet de l'email
    text: `Nouvelle demande de devis :

Nom: ${nom}
Email: ${email}
Description: ${description}
Services demandés: ${services}`,
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Erreur d'envoi de l'email:", error);
      return res
        .status(500)
        .json({
          message: "Une erreur est survenue lors de l'envoi de l'email.",
        });
    }
    console.log("Email envoyé:", info.response);
    res.status(200).json({ message: "Demande de devis envoyée avec succès !" });
  });
});

// Route par défaut pour afficher index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

console.log(process.env.GMAIL_PASS); // Affiche l'email pour vérifier
console.log(process.env.GMAIL_USER); // Affiche le mot de passe pour vérifier
