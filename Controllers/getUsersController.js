const db = require('../Config/db');

// ✅ GET all users
const getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });
    res.json(result);
  });
};

module.exports = { getUsers };
