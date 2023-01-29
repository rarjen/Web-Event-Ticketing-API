const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: [true, "Nama harus diisi"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email harus diisi"],
    },
    password: {
      type: String,
      minlength: [6, "Password minimal 6 karakter"],
      required: [true, "Password harus diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

// hooksnya mongo, sebelum disimpan ke data maka akan melakukan modifikasi password di hash
// tidak bisa menggunakan arrow function karena ada this
userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 10);
  }
  next();
});

// method untuk melakukan komparasi password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// Nama db, schema
module.exports = mongoose.model("User", userSchema);
