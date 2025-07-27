const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  targetAmount: Number,
  savedAmount: { type: Number, default: 0 },
  deadline: Date,
});

module.exports = mongoose.model("Goal", GoalSchema);
