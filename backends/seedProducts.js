const mongoose = require('mongoose');
const Product = require('./models/Product');
const productsData = require('./data/products');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  await Product.deleteMany({});
  await Product.insertMany(productsData);
  console.log('Products seeded successfully');
  mongoose.disconnect();
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
