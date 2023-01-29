const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let organizerSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "Organizer harus diisi"],
    },
  },
  { timestamps: true }
);

// Nama db, schema
module.exports = model("Organizer", organizerSchema);
