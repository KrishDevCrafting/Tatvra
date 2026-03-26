const express = require("express");
const router = express.Router();
const { getUsers, deleteUser } = require("../Controllers/userController");
const { verifyToken } = require("../Middleware/authMiddleware");

// Protected Routes - Inme bina Token (Bouncer ko dikhaye bina) entry allowed nai hai 🔐
router.get("/", verifyToken, getUsers);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
