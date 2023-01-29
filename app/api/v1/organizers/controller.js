const { StatusCodes } = require("http-status-codes");
const { createOrganizers } = require("../../../services/mongoose/users");

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

module.exports = { createCMSOrganizer };
