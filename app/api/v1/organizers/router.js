const router = require("express").Router();
// const upload = require("../../../middlewares/multer");

const { createCMSOrganizer } = require("./controller");

router.post("/organizers", createCMSOrganizer);

module.exports = router;
