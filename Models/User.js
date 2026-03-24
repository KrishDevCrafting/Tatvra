const db = require("../Config/db");

// Create User (NO hashing)
const createUser = async ({  email, password,  }) => {
  const query = `
    INSERT INTO users ( email, password,)
    VALUES (?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [ email, password],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Find user by email
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

// Compare password (simple compare)
const comparePassword = async (inputPassword, storedPassword) => {
  return inputPassword === storedPassword;
};

module.exports = {
  createUser,
  findUserByEmail,
  comparePassword,
};