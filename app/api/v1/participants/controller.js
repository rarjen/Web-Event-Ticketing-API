const { StatusCodes } = require("http-status-codes");
const {
  signupParticipants,
  signInParticipant,
  getAllEvents,
  getAllOrders,
  getOneEvent,
} = require("../../../services/mongoose/participants");

const signup = async (req, res, next) => {
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

const singin = async (req, res, next) => {
  try {
    const result = await signInParticipant(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success login",
      data: { token: result },
    });
  } catch (error) {
    next(error);
  }
};

const allEvents = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all events",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const oneEvent = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get event",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const allOrders = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all orders",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, singin, allEvents, oneEvent, allOrders };
