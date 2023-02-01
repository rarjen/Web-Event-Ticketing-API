const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizers = async (req) => {
  const { organizer, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password tidak cocok");
  }

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

const createUsers = async (req, res) => {
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

module.exports = { createOrganizers, createUsers };
