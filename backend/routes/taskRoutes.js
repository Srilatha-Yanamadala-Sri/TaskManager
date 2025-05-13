const express = require('express');
const Task = require('../models/Task'); // Import the Task model
const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch tasks from the database
        res.status(200).json(tasks); // Return tasks as an array
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Example POST route
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const newTask = new Task({ title, isCompleted: false });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid task ID' });
  }
});
// Example PUT route
router.put('/:id', async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, isCompleted },
      { new: true } // Return the updated document
    );
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Invalid task ID or data' });
  }
});

module.exports = router;