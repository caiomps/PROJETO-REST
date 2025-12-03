const express = require("express");
const Product = require("../models/Produto");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  res.json(await Product.find());
});

router.post("/", async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(p);
});

router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

router.put("/:id/promotion", async (req, res) => {
  const { promoPrice } = req.body;
  const p = await Product.findByIdAndUpdate(
    req.params.id,
    { promoPrice },
    { new: true }
  );
  res.json(p);
});

router.delete("/:id/promotion", async (req, res) => {
  const p = await Product.findByIdAndUpdate(
    req.params.id,
    { promoPrice: null },
    { new: true }
  );
  res.json(p);
});

module.exports = router;
