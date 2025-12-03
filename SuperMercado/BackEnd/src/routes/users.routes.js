const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const users = await User.find({}, "-passwordHash");
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id, "-passwordHash");
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
});

router.post("/", async (req, res) => {
  const { name, email, password, cpf, role } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      cpf,
      passwordHash: hash,
      role: role || "funcionario"
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      role: user.role
    });
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, email, password, cpf, role } = req.body;

  const update = { name, email, cpf, role };

  if (password) update.passwordHash = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(req.params.id, update, {
    new: true,
    select: "-passwordHash"
  });

  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  res.json(user);
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
