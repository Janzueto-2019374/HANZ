const express = require('express');
const router = express.Router();
const Product = require('./models/Product');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
  const { name, description, price, category, images } = req.body;
  const product = new Product({
    name,
    description,
    price,
    category,
    images,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
