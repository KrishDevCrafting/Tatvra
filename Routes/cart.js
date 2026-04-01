const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Middleware/authMiddleware");
const { addToCart, getCart } = require("../Controllers/CartController");

// POST /cart/add -> Item cart mein daalo (Login zaroori!)
router.post("/add", verifyToken, addToCart);

// GET /cart -> Apna cart dekho (Login zaroori!)
router.get("/", verifyToken, getCart);

module.exports = router;
// foreign key