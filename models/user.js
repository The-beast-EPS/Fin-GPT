const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  income: Number,
  riskLevel: String, // low, medium, high
  goals: [{ type: String }],
});

module.exports = mongoose.model("User", UserSchema);
