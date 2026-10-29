const { Schema, model } = require("mongoose");
const mk = (name, fields) => model(name, new Schema(fields, { timestamps: true }));
module.exports = {
  Customer: mk("Customer", { name: String, email: String, city: String, orders: { type: Number, default: 0 } }),
  Order: mk("Order", { customer: String, total: Number, status: { type: String, enum: ["Processing", "Shipped", "Delivered", "Cancelled"], default: "Processing" } }),
  Invoice: mk("Invoice", { client: String, amount: Number, status: { type: String, enum: ["Paid", "Pending", "Overdue"], default: "Pending" }, date: { type: Date, default: Date.now } }),
  Product: mk("Product", { name: String, price: Number, stock: { type: Number, default: 0 }, category: String }),
  Post: mk("Post", { title: String, body: String, likes: { type: Number, default: 0 } }),
  Message: mk("Message", { name: String, email: String, message: String }),
};
