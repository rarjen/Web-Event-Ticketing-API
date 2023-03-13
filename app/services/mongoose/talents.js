const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
  const user = req.user;
  const { keyword } = req.query;

  let condition = { organizer: user.organizer };

  // mencari dengan live search, bawaan mongoose
  // i adl manipulasi string jadi walaupun upper sama lower akan dianggap sama
  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  // Relasi
  // find(condition) berarti akan mencari semua yang ada di dlm object, jika kosong maka akan findall dan jika ada isinya akan mencari by name yang di ketik
  const result = await Talents.find(condition)
    // menampilkan image dengan fk yg berada pada table talent
    .populate({
      path: "image",
      select: "_id, name",
    })
    .select("_id name role image");

  //   if (result.length <= 0) throw new NotFoundError("Pembicara tidak tersedia");

  return result;
};

const createTalent = async (req) => {
  const user = req.user;
  const { name, role, image } = req.body;

  // cari image dengan field image
  await checkingImage(image);

  if (!name) {
    throw new BadRequestError("Field tidak boleh kosong");
  }

  // cari talents dengan field name
  const checkName = await Talents.findOne({ name, organizer: user.organizer });
  // const checkImg = await Talents.findOne({ image });

  if (checkName) throw new BadRequestError("Pembicara sudah terdaftar");
  // if (checkImg) throw new BadRequestError("Gambar sudah terdaftar");

  const result = await Talents.create({
    name,
    role,
    image,
    organizer: user.organizer,
  });

  return result;
};

const getOneTalent = async (req) => {
  const user = req.user;
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id, organizer: user.organizer })
    .populate({
      path: "image",
      select: "id, name",
    })
    .select("_id name role image");

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);

  return result;
};

const updateTalent = async (req) => {
  const user = req.user;
  const { id } = req.params;
  const { name, role, image } = req.body;

  await checkingImage(image);

  // mengecek pembicara lain kecuali pembicara ini
  const check = await Talents.findOne({
    name,
    organizer: user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Pembicara sudah terdaftar");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, role, image, organizer: user.organizer },
    { new: true, runValidators: true }
  ).select("_id name role image");

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);

  return result;
};

const deleteTalent = async (req) => {
  const user = req.user;
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id, organizer: user.organizer });

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);

  await result.remove();

  return result;
};

const checkingTalent = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  getOneTalent,
  createTalent,
  updateTalent,
  deleteTalent,
  checkingTalent,
};
