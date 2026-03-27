const Product = require('../Models/Product');

// ✅ Naya Product Add karna
const createProduct = async (req, res) => {
  const { name, description, price, sku, category } = req.body;
  
  // Validation: Naam, price, aur SKU hona zaruri hai
  if (!name || !price || !sku) {
    return res.status(400).json({ message: "Name, price, and SKU are required!" });
  }

  try {
    const result = await Product.create(name, description, price, sku, category);
    res.status(201).json({ message: "Product added successfully! 📦✨", productId: result.insertId });
  } catch (err) {
    // Agar same SKU wale product dobara daalne ki koshish kari jaye...
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: "Yeh SKU (Product Code) already exist karta hai!" });
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

module.exports = { createProduct, getProducts };
