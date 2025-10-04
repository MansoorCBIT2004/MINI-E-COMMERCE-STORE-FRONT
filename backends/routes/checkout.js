const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /checkout
router.post('/', async (req, res) => {
  try {
    console.log('Checkout request received:', req.body);
    const { userId, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      console.log('Cart is empty');
      return res.status(400).json({ message: 'Your cart is empty. Please add items to your cart before checking out.' });
    }

    console.log('Items received:', items);

    // Transform items: find product by id and get _id
    const transformedItems = [];
    for (const item of items) {
      try {
        console.log(`Finding product with _id: ${item.product}`);
        const mongoose = require('mongoose');
        let product;
        if (mongoose.Types.ObjectId.isValid(item.product)) {
          product = await require('../models/Product').findOne({ _id: item.product });
        } else {
          product = await require('../models/Product').findOne({ id: item.product });
        }
        if (!product) {
          console.error(`Product not found for _id or id: ${item.product}`);
          return res.status(400).json({ message: 'One or more products in your cart are no longer available. Please review your cart and try again.' });
        }
        transformedItems.push({
          product: product._id,
          quantity: item.quantity,
        });
        console.log(`Product found: ${product._id} for _id or id ${item.product}`);
      } catch (findError) {
        console.error(`Error finding product ${item.product}:`, findError);
        return res.status(500).json({ message: 'There was an issue processing your order. Please try again later.' });
      }
    }

    console.log('Transformed items:', transformedItems);

    // Create new order
    const order = new Order({
      user: userId || null,
      items: transformedItems,
      totalAmount,
      status: 'Pending',
    });

    console.log('Order object created:', order);

    console.log('All products validated, saving order...');
    await order.save();
    console.log('Order saved successfully:', order._id);

    res.json({ message: 'Order placed successfully', orderId: order._id });
  } catch (err) {
    console.error('Order creation error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ message: 'There was an unexpected error processing your order. Please try again later.' });
  }
});

module.exports = router;


