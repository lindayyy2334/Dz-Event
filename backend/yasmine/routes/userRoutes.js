// chemins d'URL de l'pplication et les actions associées (GET, POST, PUT, DELETE)


const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route pour récupérer tous les utilisateurs
router.get("/", userController.getAllUsers);

// Route pour créer un nouvel utilisateur
router.post("/", userController.createUser);

module.exports = router;
