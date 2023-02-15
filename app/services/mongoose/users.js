const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizers = async (req) => {
  const { organizer, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password tidak cocok");
  }

  const checkOrganizers = await Organizers.findOne({ organizer });

  if (checkOrganizers)
    throw new BadRequestError("Nama organizer sudah terdaftar");

  //create organizer
  const result = await Organizers.create({ organizer });

  //create user
  const users = await Users.create({
    email,
    password,
    name,
    role: "organizer",
    organizer: result._id, // menyimpan id organizer
  });

  delete users._doc.password; //delete password agar tidak tampil di response

  return users;
};

const createUsers = async (req) => {
  const user = req.user;
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password tidak cocok");
  }
  const result = await Users.create({
    name,
    email,
    organizer: user.organizer,
    password,
    role,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find({});
  return result;
};

module.exports = { createOrganizers, createUsers, getAllUsers };
