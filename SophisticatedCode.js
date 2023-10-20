/*
* File Name: SophisticatedCode.js
* Description: This code demonstrates a sophisticated implementation of a fictional online shopping system with various functionalities.
* Author: John Doe
* Date: March 25, 2021
*/

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express app
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Enable body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes for different functionalities

// Route: Home
app.get('/', (req, res) => {
  res.send('Welcome to our online shopping system!');
});

// Route: Products
app.get('/products', (req, res) => {
  // Fetch and display all products from the database
  const products = db.getAllProducts();
  res.json(products);
});

// Route: Product Details
app.get('/products/:id', (req, res) => {
  // Fetch and display detailed information about a specific product
  const productId = req.params.id;
  const product = db.getProductById(productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Route: Add to Cart
app.post('/cart/add', (req, res) => {
  // Add a product to the user's shopping cart
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  
  const product = db.getProductById(productId);
  
  if (product) {
    // Add the product to the user's cart
    cart.addItem(product, quantity);
    res.json({ message: 'Product added to cart' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Route: Checkout
app.post('/cart/checkout', (req, res) => {
  // Process the user's cart and generate an order
  const cartItems = cart.getItems();
  
  if (cartItems.length > 0) {
    const order = {
      items: cartItems,
      total: cart.calculateTotal(),
      date: new Date(),
    };
    
    // Save the order in the database
    db.saveOrder(order);
    
    // Clear the user's cart
    cart.clear();
    
    res.json({ message: 'Order placed successfully' });
  } else {
    res.status(400).json({ error: 'Cart is empty' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});