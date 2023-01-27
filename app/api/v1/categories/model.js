const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Panjang nama kategori minimal 3 karakter"],
      maxLength: [50, "Panjang nama kategori minimal 3 karakter"],
      required: [true, "Nama kategori harus diisi"],
    },
  },
  { timestamps: true }
);

// Nama db, schema
module.exports = model("Category", categorySchema);
