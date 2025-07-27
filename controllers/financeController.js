const Goal = require("../models/goal");
const mongoose = require("mongoose");
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");

exports.addExpense = async (req, res) => {
  const { amount, category, description } = req.body;
  try {
    const expense = new Expense({
      user: "000000000000000000000000",
      amount,
      category,
      description,
    });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: "000000000000000000000000",
    }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getSummary = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId("000000000000000000000000"),
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.json(expenses);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    res.json({ msg: "Expense deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Set or update monthly budget
exports.setBudget = async (req, res) => {
  const { amount, month } = req.body;
  try {
    let budget = await Budget.findOne({
      user: "000000000000000000000000",
      month,
    });

    if (budget) {
      budget.amount = amount;
    } else {
      budget = new Budget({ user: "000000000000000000000000", month, amount });
    }

    await budget.save();
    res.json(budget);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get budget for a month
exports.getBudget = async (req, res) => {
  const { month } = req.params;
  try {
    const budget = await Budget.findOne({
      user: "000000000000000000000000",
      month,
    });
    res.json(budget || { msg: "No budget set for this month." });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Create a goal
exports.addGoal = async (req, res) => {
  const { title, targetAmount, deadline } = req.body;
  try {
    const goal = new Goal({
      user: "000000000000000000000000",
      title,
      targetAmount,
      deadline,
    });

    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get all goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: "000000000000000000000000" });
    res.json(goals);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update saved amount (optional)
exports.updateGoalProgress = async (req, res) => {
  const { goalId, amount } = req.body;
  try {
    const goal = await Goal.findOne({
      _id: goalId,
      user: "000000000000000000000000",
    });
    if (!goal) return res.status(404).json({ msg: "Goal not found" });

    goal.savedAmount += amount;
    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ msg: "Goal not found" });
    }
    res.json({ msg: "Goal deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
