const Orders = require("../Models/Order");

const getMyOrders = async (req, res) => {
  const user_id = req.user.id;

  try {
    const orders = await Orders.getOrderByUsers(user_id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Orders

const getOrderDetails = async (req, res) => {
  const user_id = req.user.id;
  const order_id = req.params.id;

  try {
    const order = await Orders.getOrderById(order_id, user_id);

    if (order.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
