const { createImages } = require("../../../services/mongoose/images");
const { StatusCodes } = require("http-status-codes");

const createImg = async (req, res, next) => {
  try {
    const result = await createImages(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Delete Data Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createImg };
