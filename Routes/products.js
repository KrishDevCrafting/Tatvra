const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
} = require("../Controllers/productController");

// GET /products -> List of all products
router.get("/", getProducts);

// POST /products/add -> Ading a new product
router.post("/add", createProduct);

// DELETE PRODUCTS

router.delete("/delete/:id", deleteProduct);
module.exports = router;
