import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Remplacez par votre utilisateur MySQL
  password: "", // Remplacez par votre mot de passe MySQL
  database: "projet", // Nom de votre base de données
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err.stack);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

export default db;
