const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  month: String, // e.g., "April 2025"
  amount: Number,
});

module.exports = mongoose.model("Budget", BudgetSchema);
