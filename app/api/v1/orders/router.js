const router = require("express").Router();

const { index } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get(
  "/orders",
  authenticateUser,
  authorizeRoles("admin", "organizer", "owner"),
  index
);

module.exports = router;
