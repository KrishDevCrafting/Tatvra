const db = require('../Config/db');

const Product = {
  create: async (name, description, price, sku, category) => {
    // Ye direct Database table 'products' ke andar insert karega
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO products (name, description, price, sku, category) VALUES (?, ?, ?, ?, ?)",
        [name, description, price, sku, category],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  findAll: async () => {
    // Sabhi products nikal kar dega dukan (database) se
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM products ORDER BY created_at DESC", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = Product;
