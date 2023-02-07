const {
  getAllEvents,
  getOneEvents,
  updateEvents,
  createEvents,
  deleteEvents,
  changeStatusEvent,
} = require("../../../services/mongoose/events");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createEvents(req);
    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneEvents(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateEvents(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success update data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteEvents(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success delete data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const changeStatus = async (req, res, next) => {
  const result = await changeStatusEvent(req);

  return res.status(StatusCodes.OK).json({
    status: true,
    message: "Success update status",
    data: result,
  });
};

module.exports = { create, index, find, update, destroy, changeStatus };
