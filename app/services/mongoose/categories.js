const Categories = require("../../api/v1/categories/model");
const { NotFoundError, BadRequestError } = require("../../errors");

// menampilkan semua data by id orginzer
const getAllCategories = async (req) => {
  const user = req.user;

  const result = await Categories.find({ organizer: user.organizer });

  return result;
};

const createCategories = async (req) => {
  const user = req.user;
  const { name } = req.body;

  const check = await Categories.findOne({ name });

  if (check) throw new BadRequestError("Nama kategori sudah ada");

  const result = await Categories.create({ name, organizer: user.organizer });

  return result;
};

const getOneCategories = async (req) => {
  const user = req.user;
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: user.organizer,
  }).select("_id name");

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  return result;
};

const updateCategories = async (req) => {
  const user = req.user;
  const { id } = req.params;
  const { name } = req.body;

  // cari categories field name dan id selain yang dikirim dari params
  const check = await Categories.findOne({
    name,
    organizer: user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Kategori nama duplikat");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const user = req.user;
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  await result.remove();

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
