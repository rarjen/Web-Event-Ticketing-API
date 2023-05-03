const {
  jwtSecret,
  jwtExpiration,
  jwtRefreshTokenSecret,
  jwtRefreshTokenExpiration,
} = require("../config");
const jwt = require("jsonwebtoken");

// token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtRefreshTokenSecret, {
    expiresIn: jwtRefreshTokenExpiration,
  });

  return token;
};

//refresh token
const isTokenValidRefresh = ({ token }) =>
  jwt.verify(token, jwtRefreshTokenSecret);

module.exports = {
  createJWT,
  isTokenValid,
  createRefreshJWT,
  isTokenValidRefresh,
};
