const { StatusCodes } = require("http-status-codes");
const {
  createOrganizers,
  createUsers,
  getAllUsers,
} = require("../../../services/mongoose/users");

const getCMSUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

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

module.exports = { createCMSOrganizer, createCMSUser, getCMSUsers };
