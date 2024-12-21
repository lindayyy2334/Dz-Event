import express from "express";
import {
  creerReservation,
  updateEtatReservation,
  handleReservationByPrestataire,
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", creerReservation);
router.put("/:id", updateEtatReservation);
router.put("/:id/decision", handleReservationByPrestataire); // Nouvelle route

export default router;
