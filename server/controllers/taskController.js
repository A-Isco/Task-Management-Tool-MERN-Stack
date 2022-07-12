const Task = require("../models/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { createTaskValidationSchema } = require("../schemas/taskSchema");

const { genSalt, hash, compare } = bcrypt;
const { sign } = jwt;

// Create Task
const createTask = async (req, res) => {
  // const userEmail = req.userInfo.email;
  const userID = req.userInfo.userID;

  // Data validation
  const { error } = createTaskValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let priorityNumebr = 0;

  if (req.body.priority === "High") {
    priorityNumebr = 1;
  }
  if (req.body.priority === "Medium") {
    priorityNumebr = 2;
  }
  if (req.body.priority === "Low") {
    priorityNumebr = 3;
  }

  try {
    const task = new Task({
      createdBy: userID,
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      priorityNumebr: priorityNumebr,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    // // Create a new user

    await task.save();

    res.status(200).json({
      message: `Task was created with id: ${task._id} `,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get tasks
const getTasks = async (req, res) => {
  const userID = req.userInfo.userID;
  const listType = req.params.listType;

  try {
    const Tasks = await Task.find({ createdBy: userID, status: listType })
      .sort({ priorityNumebr: 1 })
      .sort({ startDate: 1 });
    res.status(200).json(Tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get single task
const getSingleTask = async (req, res) => {
  const userID = req.userInfo.userID;
  const taskId = req.params.taskId;

  try {
    const task = await Task.findOne({ _id: taskId, createdBy: userID });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update Task
const updateTask = async (req, res) => {
  const userID = req.userInfo.userID;
  const taskId = req.params.taskId;

  try {
    const task = await Task.findOne({ _id: taskId, createdBy: userID });

    if (task) {
      (task.title = req.body.title || task.title),
        (task.description = req.body.description || task.description),
        (task.priority = req.body.priority || task.priority),
        (task.status = req.body.status || task.status),
        (task.startDate = req.body.startDate || task.startDate),
        (task.endDate = req.body.endDate || task.endDate);
    }

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete
const deleteTask = async (req, res) => {
  const userID = req.userInfo.userID;
  const taskId = req.params.taskId;

  try {
    const task = await Task.findByIdAndRemove({
      _id: taskId,
      createdBy: userID,
    });
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
