const router = require("express").Router();

const { signinCMS } = require("./controller");

router.post("/auth/signin", signinCMS);

module.exports = router;
