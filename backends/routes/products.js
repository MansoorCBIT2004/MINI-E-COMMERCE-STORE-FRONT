const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products?search=&category=
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
