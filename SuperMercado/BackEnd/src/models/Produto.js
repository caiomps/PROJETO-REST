const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    promoPrice: { type: Number, default: null },
    expiryDate: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
