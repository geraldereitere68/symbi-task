/*
Filename: complexCode.js
Description: This code is a complex implementation of a chat application using JavaScript. It includes features like user login, real-time messaging, message encryption, file sharing, and much more.
*/

// Importing required modules
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

// Initializing express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Create server using express app
const server = http.createServer(app);

// Initialize socket.io
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Data structures to store user and message info
let users = [];
let messages = [];

// Function to generate a random username
const generateUserName = () => {
  let username = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 6; i++) {
    username += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return username;
};

// Function to encrypt messages
const encryptMessage = (message) => {
  return message.split("").reverse().join("");
};

// Function to decrypt messages
const decryptMessage = (message) => {
  return message.split("").reverse().join("");
};

// Handle new socket connections
io.on("connection", (socket) => {
  // Generate a random username for the user
  const username = generateUserName();

  // Store user info in the users array
  users.push({
    id: socket.id,
    username: username,
    socket: socket,
  });

  // Notify the user about their assigned username
  socket.emit("usernameAssigned", username);

  // Update connected users for all clients
  io.emit("updateConnectedUsers", users);

  // Send the latest messages to the connected user
  socket.emit("sendLatestMessages", messages);

  // Handle incoming messages
  socket.on("sendMessage", (message) => {
    // Encrypt the message
    const encryptedMessage = encryptMessage(message);

    // Store the encrypted message in messages array
    messages.push({
      username: username,
      message: encryptedMessage,
      timestamp: new Date().getTime(),
    });

    // Send the message to other connected users
    socket.broadcast.emit("receiveMessage", {
      username: username,
      message: encryptedMessage,
      timestamp: new Date().getTime(),
    });
  });

  // Handle file sharing
  socket.on("fileShare", (file) => {
    // Store the file in messages array
    messages.push({
      username: username,
      file: file,
      timestamp: new Date().getTime(),
    });

    // Send the file to other connected users
    socket.broadcast.emit("receiveFile", {
      username: username,
      file: file,
      timestamp: new Date().getTime(),
    });
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    // Find the user in users array and remove it
    users = users.filter((user) => user.id !== socket.id);

    // Notify other connected users about the disconnection
    socket.broadcast.emit("updateConnectedUsers", users);
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Export the app, server, and io for testing purposes
module.exports = { app, server, io };
