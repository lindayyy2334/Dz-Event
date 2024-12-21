//des fonctions qui peuvent être utilisées pour intercepter 
//modifier les requêtes HTTP avant qu’elles n’atteignent les routes. 
// un middleware pourrait être utilisé pour gérer l’authentification des utilisateurs.
const jwt = require("jsonwebtoken");

// Middleware pour vérifier le token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token manquant" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }
    req.user = decoded;
    next(); // Passer au prochain middleware ou à la route
  });
};
