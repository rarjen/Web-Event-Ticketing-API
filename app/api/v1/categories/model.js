const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Nama kategori harus diisi"],
      minlength: [3, "Panjang nama kategori minimal 3 karakter"],
      maxlength: [50, "Panjang nama kategori minimal 3 karakter"],
    },
  },
  { timestamps: true }
);

// Nama db, schema
module.exports = model("Category", categorySchema);
