const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    role: { type: String, default: "funcionario" } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
