const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addExpense,
  getExpenses,
  getSummary,
  deleteExpense,
} = require("../controllers/financeController");

router.post("/expenses", auth, addExpense);
router.get("/expenses", auth, getExpenses);
router.get("/summary", auth, getSummary);
router.delete("/expenses/:id", deleteExpense);

module.exports = router;

const {
  setBudget,
  getBudget,
  deleteGoal,
} = require("../controllers/financeController");

router.post("/budget", setBudget); // Set budget
router.get("/budget/:month", getBudget); // Get budget by month
router.delete("/goals/:id", deleteGoal);

const {
  addGoal,
  getGoals,
  updateGoalProgress,
} = require("../controllers/financeController");

router.post("/goals", addGoal); // Add new goal
router.get("/goals", getGoals); // Get all goals
router.put("/goals/update", updateGoalProgress); // Update saved amount
