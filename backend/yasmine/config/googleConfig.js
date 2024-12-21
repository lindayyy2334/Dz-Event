module.exports = {
  CLIENT_ID: "VOTRE_CLIENT_ID",
  CLIENT_SECRET: "VOTRE_CLIENT_SECRET",
  REDIRECT_URI: "http://localhost:3000/oauth2callback",
};
require("dotenv").config();

module.exports = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
};
