const router = require("express").Router();

const { create, index, find } = require("./controller");

// router.get("/categories", (req, res) => {
//   res.status(200).json({
//     status: true,
//     message: "Success Categories",
//   });
// });

router.post("/categories", create);
router.get("/categories", index);
router.get("/categories/:id", find);

module.exports = router;
