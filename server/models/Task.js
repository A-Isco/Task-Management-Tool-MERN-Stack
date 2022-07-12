const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
  priorityNumebr: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["To Do", "IN Progress", "Under Review", "Rework", "Completed"],
    default: "To Do",
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
