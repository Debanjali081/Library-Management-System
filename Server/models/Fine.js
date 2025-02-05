const mongoose = require("mongoose");

const FineSchema = new mongoose.Schema({
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction", required: true },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Fine", FineSchema);
