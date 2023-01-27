const notFound = (req, res) => {
  res.status(404).send({
    status: false,
    message: "Route does not exist",
  });
};

module.exports = notFound;
