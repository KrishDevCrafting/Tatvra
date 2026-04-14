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
        },
      );
    });
  },

  // User ka poora cart dikhana
  getCartByUser: async (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT ci.id, ci.quantity, ci.size, ci.color, p.name, p.price, p.category FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?",
        [user_id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );
    });
  },

  // Cart se item remove karna
  removeItem: async (cart_item_id, user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM cart_items WHERE id = ? AND user_id = ?",
        [cart_item_id, user_id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );
    });
  },

  // Cart item ki quantity update karna
  updateQuantity: async (cart_item_id, user_id, quantity) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?",
        [quantity, cart_item_id, user_id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );
    });
  },

  // DELETE CART - Checkout ke baad poora cart clear karna
  clearCart: async (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM cart_items WHERE user_id = ?",
        [user_id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );
    });
  },
};

module.exports = Cart;
