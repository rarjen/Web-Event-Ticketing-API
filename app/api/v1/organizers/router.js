const router = require("express").Router();
const {
  authenticateUser,
  //   authorizeRoles,
} = require("../../../middlewares/auth");

const { createCMSOrganizer, createCMSUser } = require("./controller");

router.post("/organizers", createCMSOrganizer);
router.post("/users", authenticateUser, createCMSUser);

module.exports = router;
