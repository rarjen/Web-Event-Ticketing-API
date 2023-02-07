const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createTokenUser, createJWT } = require("../../utils");

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

  return token;
};

module.exports = { signin };
