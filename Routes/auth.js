const express = require('express');
const router = express.Router();
const { register, login, logout, deleteUser } = require('../Controllers/authController');

// POST /auth/register  → user banao
router.post('/register', register);

// POST /auth/login     → login karo
router.post('/login', login);

// POST /auth/logout    → logout karo
router.post('/logout', logout);

// DELETE /auth/delete/:id → user hatao
router.delete('/delete/:id', deleteUser);

module.exports = router;