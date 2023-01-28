const router = require("express").Router();

const { createImg } = require("./controller");
const upload = require("../../../middlewares/multer");

router.post("/images", upload.single("image"), createImg);

module.exports = router;
