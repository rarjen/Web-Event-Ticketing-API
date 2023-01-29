const router = require("express").Router();
const { create, index, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  //   authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/categories", authenticateUser, create);
router.get("/categories", authenticateUser, index);
router.get("/categories/:id", find);
router.put("/categories/:id", update);
router.delete("/categories/:id", destroy);

module.exports = router;
