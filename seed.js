const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const M = require("./models");
const User = require("./models/User");

const N = ["Aslam", "Sara", "Bilal", "Hina", "Usman", "Zain", "Ayesha", "Omar", "Fatima"];
const pick = (a) => a[Math.floor(Math.random() * a.length)];

(async () => {
    try {
        // Start local in-memory database
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        console.log("Starting Local In-Memory Database...");

        await mongoose.connect(uri);
        console.log("Connected to Local Database successfully!");

        await Promise.all([User.deleteMany(), ...Object.values(M).map((m) => m.deleteMany())]);
        await User.create({ name: "JWT User", email: "info@gmail.com", password: "123456", role: "admin" });
        await M.Customer.insertMany(N.map((n) => ({ name: n, email: n.toLowerCase() + "@mail.com", city: pick(["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta"]) })));
        await M.Order.insertMany(N.map((n) => ({ customer: n, total: pick([49, 89, 150, 320]), status: pick(["Processing", "Shipped", "Delivered", "Cancelled"]) })));
        await M.Invoice.insertMany(N.map((n, i) => ({ client: n, amount: pick([120, 340, 560, 990]), status: pick(["Paid", "Pending", "Overdue"]) })));
        await M.Product.insertMany(["Sneakers", "Watch", "Headphones", "Backpack", "Camera"].map((p) => ({ name: p, price: pick([29, 59, 99, 149, 299]), stock: pick([10, 25, 50, 100]) })));
        await M.Post.insertMany(["Getting started with React", "Why Vite is fast"].map((t) => ({ title: t, body: "Sample post body." })));

        console.log("Seeded successfully! Login: info@gmail.com / 123456");

        await mongoose.disconnect();
        await mongod.stop();
        process.exit(0);
    } catch (err) {
        console.error("Seeding Failed:", err);
        process.exit(1);
    }
})();


