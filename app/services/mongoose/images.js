const Images = require("../../api/v1/images/model");

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

module.exports = { createImages, generateUrlImage };
