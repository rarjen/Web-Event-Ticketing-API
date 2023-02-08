require("dotenv").config();

const { URL_MONGODB_DEV, JWT_SECRET_KEY, URL } = process.env;

module.exports = {
  urlDB: URL_MONGODB_DEV,
  jwtExpiration: "24h",
  jwtSecret: JWT_SECRET_KEY,
  url: URL,
};
