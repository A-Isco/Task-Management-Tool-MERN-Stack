const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/show/:listType", getTasks);
router.get("/:taskId", getSingleTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
router.post("/create", createTask);

module.exports = router;
