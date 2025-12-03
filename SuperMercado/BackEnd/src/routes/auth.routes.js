const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET } = require("../middleware/auth");

const router = express.Router();

router.post("/seed-admin", async (req, res) => {
  const exists = await User.findOne({ email: "admin@123.com" });
  if (exists) return res.json({ message: "Admin já existe" });

  const hash = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Administrador",
    email: "admin@123.com",
    passwordHash: hash,
    cpf: "00000000000",
    role: "admin"
  });

  res.json({
    message: "Admin criado",
    email: "admin@123.com",
    senha: "admin123"
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Credenciais inválidas" });

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token, user });
});

module.exports = router;
