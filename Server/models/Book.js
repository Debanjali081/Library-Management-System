const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  availableCopies: { type: Number, required: true },
  totalCopies: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);

