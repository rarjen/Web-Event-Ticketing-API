const Participants = require("../../api/v1/participants/model");
const Events = require("../../api/v1/events/model");
const Orders = require("../../api/v1/orders/model");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration, url } = require("../../config");
const { sendEmail, templateHtml } = require("../mail");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors");

const sendingEmail = async (email) => {
  const payload = {
    email: email,
  };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "900s" });
  const link = `${url}/auth/verify?token=${token}`;

  const htmlEmail = await templateHtml("verify-email.ejs", {
    email: email,
    link: link,
  });
  await sendEmail(email, "Verification Email", htmlEmail);
};

const signupParticipants = async (req) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
    status = "tidak aktif",
  } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password tidak cocok");
  }
  const checkEmail = await Participants.findOne({
    email,
  });

  if (checkEmail) {
    if (checkEmail.status === "tidak aktif") {
      const participants = await Participants.findOne({
        email,
        status: "tidak aktif",
      });

      sendingEmail(checkEmail.email);
      delete participants._doc.password;

      return participants;
    } else if (checkEmail.status === "aktif") {
      throw new BadRequestError("Email sudah terdaftar");
    }
  }

  //create particpants
  const participants = await Participants.create({
    firstName,
    lastName,
    email,
    password,
  });

  sendingEmail(participants.email);
  delete participants._doc.password; //delete password agar tidak tampil di response

  return participants;
};

const signInParticipant = async (req) => {};
const getAllEvents = async (req) => {};
const getOneEvent = async (req) => {};
const getAllOrders = async (req) => {};

module.exports = { signupParticipants };
