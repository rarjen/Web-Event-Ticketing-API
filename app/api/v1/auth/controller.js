const { signin } = require("../../../services/mongoose/auth");

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

module.exports = { signinCMS };
