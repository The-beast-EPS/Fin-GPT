const express = require("express");
const router = express.Router();
const { getSuggestions } = require("../controllers/investmentController");

router.get("/suggestions", getSuggestions);

module.exports = router;
