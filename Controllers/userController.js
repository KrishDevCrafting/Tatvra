const User = require('../Models/User');

// ✅ GET all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ DELETE a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.deleteById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ message: `User ${id} deleted successfully 🗑️` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getUsers, deleteUser };
