const router = require("express").Router();

const { create, index, find, update, destroy } = require("./controller");

router.post("/events", create);
router.get("/events", index);
router.get("/events/:id", find);
router.put("/events/:id", update);
router.delete("/events/:id", destroy);

module.exports = router;
