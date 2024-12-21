//créer un serveur web.
import express from "express";
//bodyParser est utilisé pour analyser les requêtes JSON envoyées au serveur (en particulier pour traiter le corps des requêtes POST).
import bodyParser from "body-parser";
import reservationRoutes from "./routes/reservationRoutes.js";
import disponibiliteRoutes from "./routes/disponibiliteRoutes.js";

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Routes
app.use("/reservations", reservationRoutes);
app.use("/disponibilites", disponibiliteRoutes);

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
