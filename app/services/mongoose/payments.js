const Payments = require("../../api/v1/payments/model");
const { checkingImage } = require("./images");
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllPayments = async (req) => {
  const user = req.user;
  let condition = { organizer: user.organizer };

  const result = await Payments.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id type status image");

  return result;
};

const createPayment = async (req) => {
  const user = req.user;
  const { type, image } = req.body;

  await checkingImage(image);

  const check = await Payments.findOne({ type, organizer: user.organizer });

  if (check) throw new BadRequestError("Tipe pemayaran sudah ada");

  const result = await Payments.create({
    image,
    type,
    organizer: user.organizer,
  });

  return result;
};

const getOnePayments = async (req) => {};

module.exports = { getAllPayments, createPayment, getOnePayments };
