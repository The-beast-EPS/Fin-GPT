require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/finance", require("./routes/finance"));
app.use("/api/investment", require("./routes/investment"));
app.use("/api/chatbot", require("./routes/chatbot"));
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
