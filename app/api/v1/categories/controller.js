const Categories = require("./model");

const create = async (req, res, next) => {
  try {
    // const user = req.user;
    const { name } = req.body;

    const result = await Categories.create({ name });

    return res.status(201).json({
      status: true,
      message: "Data Created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await Categories.find({}).select("_id name");

    return res.status(200).json({
      status: true,
      message: "Show Data Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Categories.findOne({ _id: id }).select("_id name");

    if (!result) {
      return res.status(400).json({
        status: false,
        message: "No Data",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Show Data Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await Categories.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: true,
      message: "Update Data Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Categories.findByIdAndRemove(id);

    return res.status(200).json({
      status: true,
      message: "Delete Data Success",
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
