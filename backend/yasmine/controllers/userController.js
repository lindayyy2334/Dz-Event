//la logique métier pour chaque route. Ils agissent comme une passerelle entre les routes et les services ou modèles.
// Chaque fonction dans un contrôleur est responsable de la gestion d'une action spécifique 
//(par exemple, créer un utilisateur, récupérer des données, etc.).



const userService = require("../services/userService");

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l’utilisateur" });
  }
};
