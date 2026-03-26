const db = require('../Config/db');

const User = {
  create: async (name, email, hashedPassword) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  findByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) return reject(err);
        resolve(result.length > 0 ? result[0] : null);
      });
    });
  },

  findAll: async () => {
    return new Promise((resolve, reject) => {
      // Passwords hide kiye hain query mein security ke liye 🛡️
      db.query("SELECT id, name, email FROM users", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  deleteById: async (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = User;