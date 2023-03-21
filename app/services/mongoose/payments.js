const Payments = require("../../api/v1/payments/model");
const { checkingImage } = require("./images");
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllPayments = async (req) => {
  const user = req.user;
  let condition = { organizer: user.organizer };

  // console.log(condition);

  const result = await Payments.find(condition)
    .populate({
      path: "image",
      select: "_id, name",
    })
    .select("_id type status image");

  return result;
};

const createPayment = async (req) => {
  const user = req.user;
  const { type, image } = req.body;

  await checkingImage(image);

  const check = await Payments.findOne({ type, organizer: user.organizer });

  if (check) throw new BadRequestError("Tipe pembayaran sudah ada");

  const result = await Payments.create({
    image,
    type,
    organizer: user.organizer,
  });

  return result;
};

const getOnePayments = async (req) => {
  const { id } = req.params;
  const user = req.user;

  const result = await Payments.findOne({
    _id: id,
    organizer: user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id type status image");

  if (!result) {
    throw new NotFoundError(`Tidak ada pemabayaran dengan id: ${id}`);
  }

  return result;
};

const updatePayments = async (req) => {
  const { id } = req.params;
  const { type, image } = req.body;
  const user = req.user;

  await checkingImage(image);

  const check = await Payments.findOne({
    type,
    organizer: user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Tipe pembayaran duplikat");

  const result = await Payments.findOneAndUpdate(
    { _id: id },
    { type, image, organizer: user.organizer },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada pembayaran dengan id: ${id}`);

  return result;
};

const deletePayments = async (req) => {
  const { id } = req.params;
  const user = req.user;

  const result = await Payments.findOne({ _id: id, organizer: user.organizer });

  if (!result) {
    throw new NotFoundError(`Tidak ada tipe pembayaran dengan id: ${id}`);
  }

  await result.remove();

  return result;
};

const checkingPayments = async (id) => {
  const result = await Payments.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada pembayaran dengan id: ${id}`);

  return result;
};

module.exports = {
  getAllPayments,
  createPayment,
  getOnePayments,
  updatePayments,
  deletePayments,
  checkingPayments,
};
