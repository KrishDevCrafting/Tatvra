const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// ✅ REGISTER logic sirf password hash and call DB karta hai
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Ye abstraction dekho! Koi SQL nahi! Directly "User.findByEmail"
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create(name, email, hashedPassword);
    
    res.status(201).json({ message: "User created successfully ✅", userId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required!" });

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password!" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: '1h' }
    );

    res.json({ 
      message: "Login successful ✅", 
      token: token,
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ LOGOUT
const logout = (req, res) => {
  res.json({ message: "Logout successful 👋" });
};

module.exports = { register, login, logout };
