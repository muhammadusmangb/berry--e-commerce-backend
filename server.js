const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
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
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        
        await mongoose.connect(uri);
        console.log("Connected to Local In-Memory Database!");

        await Promise.all([User.deleteMany(), ...Object.values(M).map((m) => m.deleteMany())]);
        await User.create({ name: "JWT User", email: "info@gmail.com", password: "123456", role: "admin" });
        await M.Customer.insertMany(N.map((n) => ({ name: n, email: n.toLowerCase() + "@mail.com", city: pick(["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta"]) })));
        await M.Order.insertMany(N.map((n) => ({ customer: n, total: pick([49, 89, 150, 320]), status: pick(["Processing", "Shipped", "Delivered", "Cancelled"]) })));
        await M.Invoice.insertMany(N.map((n, i) => ({ client: n, amount: pick([120, 340, 560, 990]), status: pick(["Paid", "Pending", "Overdue"]) })));
        await M.Product.insertMany(["Sneakers", "Watch", "Headphones", "Backpack", "Camera"].map((p) => ({ name: p, price: pick([29, 59, 99, 149, 299]), stock: pick([10, 25, 50, 100]) })));
        await M.Post.insertMany(["Getting started with React", "Why Vite is fast"].map((t) => ({ title: t, body: "Sample post body." })));
        console.log("Database Auto-Seeded Successfully!");

        app.get("/", (req, res) => {
            res.send("API is running with In-Memory Database!");
        });

        const PORT = 5001; // Direct port 5001 rakh diya hai
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Server start error:", err);
    }
}

startServer();

