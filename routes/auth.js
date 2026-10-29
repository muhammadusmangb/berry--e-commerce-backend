const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const sign = (u) => jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const out = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email, password required" });
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email already registered" });
    const u = await User.create({ name, email, password });
    res.status(201).json({ token: sign(u), user: out(u) });
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email }).select("+password");
  if (!u || !(await u.matchPassword(password))) return res.status(401).json({ message: "Wrong email or password" });
  res.json({ token: sign(u), user: out(u) });
});

router.get("/me", protect, (req, res) => res.json({ user: out(req.user) }));
module.exports = router;
