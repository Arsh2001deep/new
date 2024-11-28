const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// MongoDB Atlas connection string (replace <username>, <password>, and <database> with your credentials)
const uri = "mongodb+srv://admin:admin@reasonable.deubi.mongodb.net/collection";

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Create a model
const User = mongoose.model("User", userSchema);

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, age } = req.body;

  // Create a new user document
  const newUser = new User({ name, age });

  // Save to MongoDB
  newUser
    .save()
    .then(() => {
      res.send("User data saved successfully!");
        // Redirect back to the form page
        res.redirect("/");
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).send("Failed to save user data.");
    });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
