const db = require("../Config/db");

const Cart = {
  // Item cart mein add karna
  addItem: async (user_id, product_id, quantity, size, color) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO cart_items (user_id, product_id, quantity, size, color) VALUES (?,?,?,?,?)",
        [user_id, product_id, quantity, size, color],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  // User ka poora cart dikhana
  getCartByUser: async (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM cart_items WHERE user_id = ?",
        [user_id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }
};

module.exports = Cart;
