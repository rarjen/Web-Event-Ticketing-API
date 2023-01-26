const mongoose = require("mongoose");

const { urlDB } = require("../config");

mongoose.connect(urlDB);

// simpan koneksi dalam variable db
const db = mongoose.connection;

// export db agar bisa digunakan file lain
module.exports = db;
