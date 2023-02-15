const router = require("express").Router();
const {
  signup,
  singin,
  allEvents,
  allOrders,
  oneEvent,
  checkout,
} = require("./controller");
const { authenticateParticipant } = require("../../../middlewares/auth");

router.post("/auth/signup", signup);
router.post("/auth/signin", singin);
router.get("/events", allEvents);
router.get("/events/:id", oneEvent);
router.get("/orders", authenticateParticipant, allOrders);
router.post("/checkout", authenticateParticipant, checkout);

module.exports = router;
