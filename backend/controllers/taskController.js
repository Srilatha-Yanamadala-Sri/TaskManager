const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Invalid task ID' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    // Validate title
    if (!title || title.length > 100) {
      return res.status(400).json({ error: 'Title is required and must be less than 100 characters' });
    }

    // Validate description
    if (description && description.length > 500) {
      return res.status(400).json({ error: 'Description must be less than 500 characters' });
    }

    const newTask = new Task({ title, description, isCompleted });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};exports.updateTask = async (req, res) => {
  const { title, description, isCompleted } = req.body;

  // Validate title length if provided
  if (title && title.length > 100) {
    return res.status(400).json({ error: 'Title must be less than 100 characters' });
  }

  // Validate description length if provided
  if (description && description.length > 500) {
    return res.status(400).json({ error: 'Description must be less than 500 characters' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...(title && { title }), ...(description && { description }), ...(isCompleted !== undefined && { isCompleted }) },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Invalid task ID or update failed' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid task ID' });
  }
};
