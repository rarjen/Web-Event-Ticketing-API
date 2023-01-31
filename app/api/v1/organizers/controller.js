const { StatusCodes } = require("http-status-codes");
const {
  createOrganizers,
  createUsers,
} = require("../../../services/mongoose/users");

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizers(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUsers(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCMSOrganizer, createCMSUser };
