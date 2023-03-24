const Orders = require("../../api/v1/orders/model");

const getAllOrders = async (req) => {
  const user = req.user;
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let condition = {};

  if (user.role !== "owner") {
    condition = { ...condition, "historyEvent.organizer": user.organizer };
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    condition = {
      ...condition,
      date: {
        $gte: start, // lebih dari
        $lt: end, // kurang dari
        // mirip between
      },
    };
  }

  const result = await Orders.find(condition)
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Orders.countDocuments(condition);

  return { order: result, pages: Math.ceil(count / limit), total: count };
};

module.exports = { getAllOrders };
