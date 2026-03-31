const Cart = require("../Models/Cart");

// ✅ Cart mein item add karna
const addToCart = async (req, res) => {
  // 🔐 user_id JWT token se aata hai (req.body se nahi - security!)
  const user_id = req.user.id;
  const { product_id, quantity, size, color } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required!" });
  }

  try {
    await Cart.addItem(user_id, product_id, quantity, size, color);
    res.status(201).json({ message: "Item added to cart successfully! 🛒✨" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ User ka cart dekhna
const getCart = async (req, res) => {
  const user_id = req.user.id;
  try {
    const cartItems = await Cart.getCartByUser(user_id);
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addToCart, getCart };
