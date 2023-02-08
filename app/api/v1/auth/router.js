const router = require("express").Router();

const { signinCMS, verifyEmail } = require("./controller");

router.post("/auth/signin", signinCMS);
router.get("/auth/verify", verifyEmail);

module.exports = router;
