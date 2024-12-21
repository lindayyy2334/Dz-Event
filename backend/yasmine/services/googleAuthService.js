const { google } = require("googleapis");
const googleConfig = require("../config/googleConfig");

// Créer une instance OAuth2
const oauth2Client = new google.auth.OAuth2(
  googleConfig.CLIENT_ID,
  googleConfig.CLIENT_SECRET,
  googleConfig.REDIRECT_URI
);

function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });
}

async function getToken(code) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
  } catch (error) {
    throw new Error("Erreur lors de l'obtention du token : " + error);
  }
}

module.exports = {
  oauth2Client,
  getAuthUrl,
  getToken,
};
