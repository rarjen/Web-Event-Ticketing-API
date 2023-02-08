const router = require("express").Router();
const { register } = require("./controller");

router.post("/participant/register", register);

module.exports = router;
