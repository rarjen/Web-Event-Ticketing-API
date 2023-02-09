const router = require("express").Router();
const {
  signup,
  singin,
  allEvents,
  allOrders,
  oneEvent,
} = require("./controller");
const { authenticateParticipant } = require("../../../middlewares/auth");

router.post("/auth/signup", signup);
router.post("/auth/signin", singin);
router.get("/events", allEvents);
router.get("/events/:id", oneEvent);

module.exports = router;
