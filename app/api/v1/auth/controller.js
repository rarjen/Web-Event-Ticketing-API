const { signin, verify } = require("../../../services/mongoose/auth");
const { StatusCodes } = require("http-status-codes");

const signinCMS = async (req, res, next) => {
  try {
    const result = await signin(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success login",
      data: { token: result },
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const result = await verify(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success verify email",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signinCMS, verifyEmail };
