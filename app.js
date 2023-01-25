const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//routers
const categoriesRouter = require("./app/api/v1/categories/router");

const v1 = "/api/v1/cms";

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// 200
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Success",
  });
});

app.use(v1, categoriesRouter);

// 400 handler
app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Are you lost?",
  });
});

// 500 handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    status: false,
    message: err.message,
  });
});

module.exports = app;
