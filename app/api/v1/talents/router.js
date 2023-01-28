const router = require("express").Router();
// const upload = require("../../../middlewares/multer");

const { create, index, find, update, destroy } = require("./controller");

router.post("/talents", create);
router.get("/talents", index);
router.get("/talents/:id", find);
router.put("/talents/:id", update);
router.delete("/talents/:id", destroy);

module.exports = router;
