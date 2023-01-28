const router = require("express").Router();

const { createImg } = require("./controller");

router.post("/upload", createImg);
