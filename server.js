const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define product schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String
});

// Create product model
const Product = mongoose.model('Product', productSchema);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Parse incoming JSON data
app.use(express.json());

// API endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  // Add product to the cart
  // ...
  res.sendStatus(200);
});

app.post('/api/checkout', (req, res) => {
  // Process the checkout
  // ...
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});