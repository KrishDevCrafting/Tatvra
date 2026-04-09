const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Middleware/authMiddleware");
const { addToCart, getCart, removeFromCart, updateCartQuantity } = require("../Controllers/CartController");

// POST /cart/add -> Item cart mein daalo
router.post("/add", verifyToken, addToCart);

// GET /cart -> Apna cart dekho
router.get("/", verifyToken, getCart);

// DELETE /cart/remove/:id -> Cart se item hatao
router.delete("/remove/:id", verifyToken, removeFromCart);

// PUT /cart/update/:id -> Quantity update karo
router.put("/update/:id", verifyToken, updateCartQuantity);

module.exports = router;
// foreign key