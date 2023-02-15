const { jwtSecret, jwtExpiration, jwtRefreshExpiration } = require("../config");
const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });

  return token;
};

// const createRefreshToken = ({ payload }) => {
//   const refeshToken = jwt.sign(payload, jwtSecret, {
//     expiresIn: jwtExpiration,
//   });

//   return refeshToken;
// };

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = {
  createJWT,
  //   createRefreshToken,
  isTokenValid,
};
