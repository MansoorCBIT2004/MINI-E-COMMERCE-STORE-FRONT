require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-ecommerce-store';

if (!process.env.MONGODB_URI) {
  console.log('Warning: MONGODB_URI not found in environment variables. Using default local MongoDB connection.');
  console.log('Make sure MongoDB is running locally, or set MONGODB_URI in your .env file.');
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected successfully');

  // Seed products on server startup
  try {
    const Product = require('./models/Product');
    const productsData = require('./data/products');

    const existingProductsCount = await Product.countDocuments();
    if (existingProductsCount === 0) {
      console.log('No products found in database. Seeding products...');
      await Product.deleteMany({}); // Clear any existing data
      await Product.insertMany(productsData);
      console.log(`Successfully seeded ${productsData.length} products`);
    } else {
      console.log(`Database already contains ${existingProductsCount} products. Skipping seeding.`);
    }
  } catch (seedError) {
    console.error('Error seeding products:', seedError);
    console.log('Continuing server startup despite seeding error...');
  }
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
  console.log('\nTroubleshooting steps:');
  console.log('1. Make sure MongoDB is installed and running locally');
  console.log('2. Or update MONGODB_URI in your .env file with your MongoDB Atlas connection string');
  console.log('3. Example Atlas URI: mongodb+srv://username:password@cluster.mongodb.net/mini-ecommerce-store');
});

// Import routes
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');

// Basic route
app.get('/', (req, res) => {
  res.send('Mini E-Commerce Backend is running');
});

// Use routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
