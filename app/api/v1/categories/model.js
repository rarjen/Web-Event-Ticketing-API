const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Panjang nama kategori minimal 3 karakter"],
      maxlength: [20, "Panjang nama kategori minimal 3 karakter"],
      required: true,
    },
  },
  { timestamps: true }
);

// Nama db, schema
module.exports = model("Category", categorySchema);
