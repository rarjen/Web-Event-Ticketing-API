const { StatusCodes } = require("http-status-codes");
const {
  getAllPayments,
  getOnePayments,
  createPayment,
  updatePayments,
  deletePayments,
} = require("../../../services/mongoose/payments");

const index = async (req, res, next) => {
  try {
    const result = await getAllPayments(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all payments",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOnePayments(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get payment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createPayment(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create payment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updatePayments(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success update payment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deletePayments(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success delete payment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index, find, create, update, destroy };
