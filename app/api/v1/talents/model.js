const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Nama harus diisi"],
    },
    role: {
      type: String,
      default: "-",
    },

    // Relasi image pada mongoose
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image", //nama table yang di relasi
      required: true,
    },
  },
  { timestamps: true }
);

// Nama db, schema
module.exports = model("Talent", talentSchema);
