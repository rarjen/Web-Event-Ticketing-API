const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createTokenUser, createJWT, createRefreshJWT } = require("../../utils");
const { createUserRefreshToken } = require("./userRefreshToken");

const Participants = require("../../api/v1/participants/model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email atau password tidak boleh kosong");
  }

  const result = await Users.findOne({ email });

  if (!result) {
    throw new UnauthorizedError("Email/Password salah");
  }

  // method comparePassword sudah dibuat di model user, bisa langsung panggil
  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Email/Password salah");
  }

  const token = createJWT({ payload: createTokenUser(result) });

  console.log(result);

  const refreshToken = createRefreshJWT({
    payload: createTokenUser(result),
  });

  await createUserRefreshToken({
    refreshToken,
    user: result._id,
  });

  return {
    token: token,
    refreshToken: refreshToken,
    role: result.role,
    email: result.email,
  };
};

const verify = async (req) => {
  const { token } = req.query;

  const validUser = jwt.verify(token, jwtSecret);
  if (!validUser) throw new UnauthorizedError("Token tidak valid");

  const result = await Participants.findOneAndUpdate(
    { email: validUser.email },
    { status: "aktif" },
    { new: true, runValidators: true }
  );

  delete result._doc.password;

  return result;
};

module.exports = { signin, verify };
