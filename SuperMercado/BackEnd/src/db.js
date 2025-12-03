const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectando ao banco:", process.env.MONGO_URI);

  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
}

module.exports = connectDB;
