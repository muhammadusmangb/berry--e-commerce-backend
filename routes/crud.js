const express = require("express");
// Generic CRUD router: list (search, sort, pagination), get, create, update, delete
module.exports = (Model) => {
  const r = express.Router();
  const strings = Object.keys(Model.schema.paths).filter((k) => Model.schema.paths[k].instance === "String");

  r.get("/", async (req, res) => {
    const { search, sort = "-createdAt", page = 1, limit = 20 } = req.query;
    const filter = search ? { $or: strings.map((k) => ({ [k]: new RegExp(search, "i") })) } : {};
    const [items, total] = await Promise.all([
      Model.find(filter).sort(sort).skip((page - 1) * limit).limit(+limit),
      Model.countDocuments(filter),
    ]);
    res.json({ items, total, page: +page, pages: Math.ceil(total / limit) });
  });
  r.get("/:id", async (req, res) => {
    const d = await Model.findById(req.params.id).catch(() => null);
    d ? res.json(d) : res.status(404).json({ message: "Not found" });
  });
  r.post("/", async (req, res) => {
    try { res.status(201).json(await Model.create(req.body)); }
    catch (e) { res.status(400).json({ message: e.message }); }
  });
  r.put("/:id", async (req, res) => {
    try {
      const d = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      d ? res.json(d) : res.status(404).json({ message: "Not found" });
    } catch (e) { res.status(400).json({ message: e.message }); }
  });
  r.delete("/:id", async (req, res) => {
    const d = await Model.findByIdAndDelete(req.params.id).catch(() => null);
    d ? res.json({ message: "Deleted" }) : res.status(404).json({ message: "Not found" });
  });
  return r;
};
