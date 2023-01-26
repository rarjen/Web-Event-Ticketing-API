require("dotenv").config();

const { URL_MONGODB_DEV } = process.env;

module.exports = {
  urlDB: URL_MONGODB_DEV,
};
