const router = require("express").Router();
const { Customer, Order, Invoice, Product } = require("../models");
const User = require("../models/User");
router.get("/", async (req, res) => {
  const sum = async (M, f) => (await M.aggregate([{ $group: { _id: null, t: { $sum: "$" + f } } }]))[0]?.t || 0;
  const monthly = await Invoice.aggregate([
    { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } }, { $sort: { _id: 1 } },
  ]);
  res.json({
    users: await User.countDocuments(), customers: await Customer.countDocuments(),
    orders: await Order.countDocuments(), products: await Product.countDocuments(),
    totalIncome: await sum(Invoice, "amount"), totalOrderValue: await sum(Order, "total"),
    monthly,
  });
});
module.exports = router;
