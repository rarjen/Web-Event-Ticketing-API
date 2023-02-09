const Participants = require("../../api/v1/participants/model");
const Events = require("../../api/v1/events/model");
const Orders = require("../../api/v1/orders/model");
const jwt = require("jsonwebtoken");
const { jwtSecret, url } = require("../../config");
const { sendEmail, templateHtml } = require("../mail");
const {
  createTokenUser,
  createJWT,
  createTokenParticipant,
} = require("../../utils/");
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
  const link = `${url}/cms/auth/verify?token=${token}`;

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

const signInParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email atau password tidak boleh kosong");
  }

  const result = await Participants.findOne({
    email,
  });

  if (result) {
    if (result.status === "tidak aktif") {
      throw new UnauthorizedError(
        "Email belum di verifikasi, silakan cek email atau registrasi ulang"
      );
    }
  } else if (!result) {
    throw new UnauthorizedError("Email/Password salah");
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Email/Password salah");
  }
  const token = createJWT({
    payload: createTokenParticipant(result),
  });

  return token;
};
const getAllEvents = async (req) => {
  const result = await Events.find({ statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");

  if (!result) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  const participant = req.participant;

  const result = await Orders.find({ participant });

  return result;
};

module.exports = {
  signupParticipants,
  signInParticipant,
  getAllOrders,
  getAllEvents,
  getOneEvent,
};
