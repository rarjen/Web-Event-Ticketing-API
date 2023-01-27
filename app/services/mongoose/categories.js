const Categories = require("../../api/v1/categories/model");
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find({});

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({ name });

  if (check) throw new BadRequestError("Nama kategori sudah ada");

  const result = await Categories.create({ name });

  return result;
};

module.exports = { getAllCategories, createCategories };
