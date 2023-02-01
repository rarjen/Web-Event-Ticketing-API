const Events = require("../../api/v1/events/model");
const { checkingImage } = require("./images");
const { checkingCategories } = require("./categories");
const { checkingTalent } = require("./talents");
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllEvents = async (req) => {
  const user = req.user;
  const { keyword, category, talent } = req.query;

  let condition = { organizer: user.organizer };

  // search
  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }
  if (category) {
    condition = { ...condition, title: { $regex: category } };
  }
  if (talent) {
    condition = { ...condition, title: { $regex: talent } };
  }

  const result = await Events.find(condition)
    .populate({ path: "image", select: "_id name" })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  return result;
};

const createEvents = async (req) => {
  const user = req.user;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // cari image, category, dan talent dengan field id
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalent(talent);

  // cari events dengan field name
  const check = await Events.findOne({ title });

  if (check) throw new BadRequestError("Title event sudah terdaftar");

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: user.organizer,
  });

  return result;
};

const getOneEvents = async (req) => {
  const user = req.user;
  const { id } = req.params;

  const result = Events.findOne({ _id: id, organizer: user.organizer })
    .populate({ path: "image", select: "_id name" })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  if (!result) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

  return result;
};

const updateEvents = async (req) => {
  const user = req.user;
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // cari image, category, dan talent dengan field id
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalent(talent);

  const checkEvent = await Events.findOne({ _id: id });

  if (!checkEvent) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

  const check = await Events.findOne({
    title,
    organizer: user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Title event sudah terdaftar");

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      organizer: user.organizer,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteEvents = async (req) => {
  const user = req.user;
  const { id } = req.params;

  const result = await Events.findOne({ _id: id, organizer: user.organizer });

  if (!result) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

  await result.remove();

  return result;
};

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
};
