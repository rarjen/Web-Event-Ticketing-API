const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let imageSchema = Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

// Nama db, schema
module.exports = model("Image", imageSchema);
