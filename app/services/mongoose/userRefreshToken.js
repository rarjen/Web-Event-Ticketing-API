const UserRefreshToken = require("../../api/v1/userRefreshToken/model");
const Users = require("../../api/v1/users/model");
const {
  isTokenValidRefresh,
  createJWT,
  createTokenUser,
} = require("../../utils");
const { NotFoundError, BadRequestError } = require("../../errors");

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken, email } = req.params;
  const result = await UserRefreshToken.findOne({ refreshToken });

  if (!result) {
    throw new NotFoundError("Refresh token tidak valid");
  }

  const payload = isTokenValidRefresh({ token: result.refreshToken });

  if (email !== payload.email) {
    throw new BadRequestError("Email tidak valid");
  }

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
