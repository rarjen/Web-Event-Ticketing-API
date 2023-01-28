const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

const generateUrlImage = async (req) => {
  const result = `upload/${req.file.filename}`;

  return result;
};

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `upload/${req.file.filename}`
      : "uploads/avatar/default.jpeg",
  });

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });

  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id: ${id}`);

  return result;
};

module.exports = { createImages, generateUrlImage, checkingImage };
