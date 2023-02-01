const router = require("express").Router();
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

const { createCMSOrganizer, createCMSUser } = require("./controller");

router.post(
  "/organizers",
  authenticateUser,
  authorizeRoles("owner"),
  createCMSOrganizer
);

router.post(
  "/users",
  authenticateUser,
  authorizeRoles("organizer"),
  createCMSUser
);

module.exports = router;
