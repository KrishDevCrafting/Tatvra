const db = require('../Config/db');
const bcrypt = require('bcryptjs');

// ✅ CREATE USER (Register)
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err });

      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists!" });
      }

      // Hash password 🔐
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: "DB Error", error: err });
          res.status(201).json({ message: "User created successfully ✅", userId: result.insertId });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ✅ LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required!" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = result[0];

    // Compare hashed password 🔐
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password!" });
    }

    res.json({ message: "Login successful ✅", user: { id: user.id, name: user.name, email: user.email } });
  });
};

// ✅ LOGOUT
const logout = (req, res) => {
  // JWT/session based logout aayega baad mein
  res.json({ message: "Logout successful 👋" });
};

// ✅ DELETE USER
const deleteUser = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: `User ${id} deleted successfully 🗑️` });
  });
};

module.exports = { register, login, logout, deleteUser };
