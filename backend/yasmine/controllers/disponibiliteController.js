// controllers/disponibiliteController.js
import db from "../config/db.js";

// Ajouter une disponibilité
export const addDisponibilite = (req, res) => {
  const { id_prestataire, date_disponible } = req.body;
  const query =
    "INSERT INTO disponibilites (id_prestataire, date_disponible, statut) VALUES (?, ?, 'disponible')";

  db.query(query, [id_prestataire, date_disponible], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({
      id: results.insertId,
      id_prestataire,
      date_disponible,
      statut: "disponible",
    });
  });
};

