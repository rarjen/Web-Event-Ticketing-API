require("dotenv").config();

const {
  URL_MONGODB_DEV,
  JWT_SECRET_KEY,
  JWT_EXPIRATION,
  JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_EXPIRATION,
  URL,
} = process.env;

module.exports = {
  urlDB: URL_MONGODB_DEV,
  jwtExpiration: JWT_EXPIRATION,
  jwtSecret: JWT_SECRET_KEY,
  jwtRefreshTokenSecret: JWT_REFRESH_TOKEN_SECRET_KEY,
  jwtRefreshTokenExpiration: JWT_REFRESH_TOKEN_EXPIRATION,
  url: URL,
};
