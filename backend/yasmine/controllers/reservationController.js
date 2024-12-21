// controllers/reservationController.js
import db from "../config/db.js";

// Créer une réservation
export const creerReservation = (req, res) => {
  const { id_client, id_prestataire, date_reservation } = req.body;
  const checkQuery =
    "SELECT * FROM disponibilites WHERE id_prestataire = ? AND date_disponible = ? AND statut = 'disponible'";

  db.query(checkQuery, [id_prestataire, date_reservation], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res.status(400).send({ message: "Date non disponible." });
    const query =
      "INSERT INTO reservation (id_client, id_prestataire, date_reservation, etat) VALUES (?, ?, ?, 'en attente')";
    db.query(
      query,
      [id_client, id_prestataire, date_reservation],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({
          id: results.insertId,
          id_client,
          id_prestataire,
          date_reservation,
          etat: "en attente",
        });
      }
    );
  });
};

// Mettre à jour l'état de la réservation
export const updateEtatReservation = (req, res) => {
  const { id } = req.params;
  const { etat } = req.body;
  const query = "UPDATE reservation SET etat = ? WHERE id_reservation = ?";
  db.query(query, [etat, id], (err, results) => {
    if (err) return res.status(500).send(err);

    if (etat === "acceptée") {
      const updateDisponibilite =
        "UPDATE disponibilites SET statut = 'non disponible' WHERE id_prestataire = (SELECT id_prestataire FROM reservation WHERE id_reservation = ?) AND date_disponible = (SELECT date_reservation FROM reservation WHERE id_reservation = ?)";
      db.query(updateDisponibilite, [id, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({
          message: "Réservation acceptée et disponibilité mise à jour.",
        });
      });
    } else {
      res.send({ message: "État de la réservation mis à jour." });
    }
  });
};


// Accepter ou rejeter une réservation
export const handleReservationByPrestataire = (req, res) => {
  const { id } = req.params; // ID de la réservation
  const { etat } = req.body; // Nouveau état : acceptée ou rejetée

  // Vérification des états valides
  const etatsValides = ["acceptée", "rejetée"];
  if (!etatsValides.includes(etat)) {
    return res.status(400).send({
      message: "État invalide. Les états valides sont : 'acceptée', 'rejetée'.",
    });
  }

  // Mettre à jour l'état de la réservation
  const updateReservationQuery =
    "UPDATE reservation SET etat = ? WHERE id_reservation = ? AND etat = 'en attente'";
  db.query(updateReservationQuery, [etat, id], (err, results) => {
    if (err) return res.status(500).send(err);

    // Vérifier si la réservation existe et est en attente
    if (results.affectedRows === 0) {
      return res.status(404).send({
        message: "Réservation introuvable ou déjà traitée.",
      });
    }

    // Mettre à jour le statut de la disponibilité correspondante
    const updateDisponibiliteQuery =
      "UPDATE disponibilites SET statut = ? WHERE id_prestataire = (SELECT id_prestataire FROM reservation WHERE id_reservation = ?) AND date_disponible = (SELECT date_reservation FROM reservation WHERE id_reservation = ?)";
    db.query(updateDisponibiliteQuery, [etat, id, id], (err) => {
      if (err) return res.status(500).send(err);

      res.send({
        message:
          etat === "acceptée"
            ? "Réservation acceptée et disponibilité mise à jour."
            : "Réservation rejetée et disponibilité mise à jour.",
      });
    });
  });
};
