const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizers = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  console.log(req.body);
  if (password !== confirmPassword) {
    throw new BadRequestError("Password tidak cocok");
  }

  const check = Users.findOne({ email });
  if (check) throw new BadRequestError("Email sudah terdaftar");

  //create organizer
  const result = await Organizers.create({ organizer });

  //create user
  const users = await Users.create({
    email,
    password,
    name,
    role,
    organizer: result._id, // menyimpan id organizer
  });

  delete users._doc.password; //delete password agar tidak tampil di response

  return users;
};

module.exports = { createOrganizers };