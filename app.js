const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//error handling import
const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddlware = require("./app/middlewares/handle-error");

//routers
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/events/router");
const organizersRouter = require("./app/api/v1/organizers/router");
const authCMSRouter = require("./app/api/v1/auth/router");
const ordersRouter = require("./app/api/v1/orders/router");
const participantsRouter = require("./app/api/v1/participants/router");
const paymentsRouter = require("./app/api/v1/payments/router");

const v1 = "/api/v1";

app.use(cors());
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// 200
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Success",
  });
});

// Use Routes
app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizersRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, ordersRouter);
app.use(`${v1}/cms`, paymentsRouter);
app.use(`${v1}`, participantsRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddlware);
// // 400 handler
// app.use((req, res, next) => {
//   return res.status(404).json({
//     status: false,
//     message: "Are you lost?",
//   });
// });

// // 500 handler
// app.use((err, req, res, next) => {
//   console.log(err);
//   return res.status(500).json({
//     status: false,
//     message: err.message,
//   });
// });

module.exports = app;
