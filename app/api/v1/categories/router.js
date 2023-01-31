const router = require("express").Router();
const { create, index, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/categories", authenticateUser, create);
router.get("/categories", authenticateUser, authorizeRoles("organizer"), index);
router.get(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  find
);
router.put(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);

module.exports = router;
