const Product = require("../Models/Product");

// ✅ Naya Product Add karna
const createProduct = async (req, res) => {
  const { name, description, price, sku, category } = req.body;

  // Validation: Naam, price, aur SKU hona zaruri hai
  if (!name || !price || !sku) {
    return res
      .status(400)
      .json({ message: "Name, price, and SKU are required!" });
  }

  try {
    const result = await Product.create(
      name,
      description,
      price,
      sku,
      category,
    );
    res.status(201).json({
      message: "Product added successfully! 📦✨",
      productId: result.insertId,
    });
  } catch (err) {
    // Agar same SKU wale product dobara daalne ki koshish kari jaye...
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ message: "Yeh SKU (Product Code) already exist karta hai!" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Sabhi Products ko Show karna
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE PRODUCTS

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.deleteById(id);

    // Agar row mili hi nahi delete karne ko
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.json({
      message: `Product ${id} deleted successfully! 🗑️✨`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Price

const updatePrice = async (req, res) => {
  const { id } = req.params;
  const { newprice } = req.body;
  try {
    const result = await Product.UpdatePrice(id, newprice);
    res.json({ message: "Price updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createProduct, getProducts, deleteProduct, updatePrice };
