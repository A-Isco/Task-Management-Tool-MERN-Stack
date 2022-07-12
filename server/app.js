const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());

app.use(express.json());

// auth middleware
const authMiddleware = require("./middleware/authentication");

// Routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/task", authMiddleware, taskRouter);

module.exports = app;
