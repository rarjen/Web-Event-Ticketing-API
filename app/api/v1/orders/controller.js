const { getAllOrders } = require("../../../services/mongoose/orders");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index };
