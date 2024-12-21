
// routes/disponibiliteRoutes.js
import express from "express";
import { addDisponibilite } from "../controllers/disponibiliteController.js";

const router = express.Router();

router.post("/", addDisponibilite);

export default router;