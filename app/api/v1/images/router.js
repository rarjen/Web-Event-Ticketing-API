const router = require("express").Router();

const { createImg } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const upload = require("../../../middlewares/multer");

router.post("/images", upload.single("image"), authenticateUser, createImg);

module.exports = router;
