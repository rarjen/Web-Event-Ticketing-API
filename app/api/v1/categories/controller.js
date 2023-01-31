const { StatusCodes } = require("http-status-codes");
const {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoose/categories");

const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);

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
    const result = await getAllCategories(req);

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
    const result = await getOneCategories(req);

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
    const result = await updateCategories(req);

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
    const result = await deleteCategories(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success delete data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  find,
  index,
  destroy,
  update,
};
