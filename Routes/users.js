const express = require('express');
const router = express.Router();
const { getUsers } = require('../Controllers/getUsersController');

// GET /users → saare users lao
router.get('/', getUsers);

module.exports = router;
