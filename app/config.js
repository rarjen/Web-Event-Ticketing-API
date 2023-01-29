require("dotenv").config();

const { URL_MONGODB_DEV, JWT_SCRET_KEY } = process.env;

module.exports = {
  urlDB: URL_MONGODB_DEV,
  jwtExpiration: "24h",
  jwtSecret: JWT_SCRET_KEY,
};
