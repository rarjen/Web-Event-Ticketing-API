const { StatusCodes } = require("http-status-codes");

const {
  getAllTalents,
  getOneTalent,
  createTalent,
  checkingTalent,
  updateTalent,
  deleteTalent,
} = require("../../../services/mongoose/talents");

const create = async (req, res, next) => {
  try {
    const result = await createTalent(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllTalents(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneTalent(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTalent(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteTalent(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, find, update, destroy };
