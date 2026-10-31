const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const M = require("./models");
const User = require("./models/User");
const N = ["Aslam", "Sara", "Bilal", "Hina", "Usman", "Zain", "Ayesha", "Omar", "Fatima"];
const pick = (a) => a[Math.floor(Math.random() * a.length)];

async function startServer() {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error("MONGO_URI is missing in environment variables!");
    } else {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB Atlas!");
    }

    app.get("/", (req, res) => {
      res.send("API is running with MongoDB Atlas!");
    });

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server start error:", err);
  }
}

startServer();
module.exports = app;