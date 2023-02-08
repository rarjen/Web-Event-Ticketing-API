const { StatusCodes } = require("http-status-codes");
const {
  signupParticipants,
} = require("../../../services/mongoose/participants");

const register = async (req, res, next) => {
  try {
    const result = await signupParticipants(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success register, please chek your email",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
