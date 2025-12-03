const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    document: { type: String, required: true },
    age: { type: Number, required: true },
    customerSince: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
