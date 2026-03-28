const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  deleteProduct,
} = require("../Controllers/productController");

// GET /products -> List of all products
router.get("/", getProducts);

// POST /products/add -> Ading a new product
router.post("/add", verifyToken, createProduct);

// DELETE PRODUCTS

router.delete("/delete/:id", verifyToken, deleteProduct);
module.exports = router;
