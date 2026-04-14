const db = require("../Config/db");

const Orders = {
  createOrder: async (user_id, total_amount, shipping_address) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO orders (user_id,total_amount,shipping_address)VALUES(?,?,?)",
        [user_id, total_amount, shipping_address],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );
    });
  },

  // GetOrderByUsers
  getOrderByUsers: async (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM orders WHERE user_id = ?",
        [user_id],
        (err, result) => {
          if (err) return reject(err);
          else resolve(result);
        },
      );
    });
  },

  // #GetOrderById

  getOrderById: async (order_id, user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT o.*,oi.product_id,oi.quantity,oi.price,oi.size,oi.color FROM orders o JOIN order_items oi ON o.id = oi.order_id WHERE o.id = ? AND o.user_id = ?",
        [order_id, user_id],
        (err, result) => {
          if (err) return reject(err);
          else resolve(result);
        },
      );
    });
  },
};

module.exports = Orders;
