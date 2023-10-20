/* sophisticated_code.js */
// This code demonstrates a complex implementation of a shopping cart system

// Define the product class
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

// Define the shopping cart class
class ShoppingCart {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productName) {
    this.products = this.products.filter((product) => product.name !== productName);
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const product of this.products) {
      totalPrice += product.price * product.quantity;
    }
    return totalPrice;
  }

  checkout() {
    // Simulating complex checkout process
    console.log("Performing complex checkout process...");
    // Delaying execution for 3 seconds to simulate processing
    setTimeout(() => {
      console.log("Checkout complete. Thank you for shopping!");
    }, 3000);
  }
}

// Create instance of ShoppingCart
const cart = new ShoppingCart();

// Add products to the cart
cart.addProduct(new Product("Laptop", 1000, 1));
cart.addProduct(new Product("Mouse", 20, 2));
cart.addProduct(new Product("Keyboard", 50, 1));

// Remove a product from the cart
cart.removeProduct("Mouse");

// Get the total price of the cart
const totalPrice = cart.getTotalPrice();
console.log("Total Price:", totalPrice);

// Perform checkout
cart.checkout();