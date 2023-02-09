const router = require("express").Router();
const { register } = require("./controller");

router.post("/auth/signup", register);

module.exports = router;
