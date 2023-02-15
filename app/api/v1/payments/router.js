const router = require("express").Router();
const {
  allPayments,
  onePayment,
  update,
  destroy,
  create,
} = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/payments", authenticateUser, authorizeRoles("organizer"), create);

router.get(
  "/payments",
  authenticateUser,
  authorizeRoles("organizer"),
  allPayments
);

router.get(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  onePayment
);

router.put(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);

router.delete(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);

module.exports = router;
