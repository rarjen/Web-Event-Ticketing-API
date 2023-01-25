const router = require("express").Router();

router.get("/categories", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Success Categories",
  });
});

module.exports = router;
