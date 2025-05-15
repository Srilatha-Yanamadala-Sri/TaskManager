const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  isCompleted: { type: Boolean, default: false }, // Ensure this field exists
});

module.exports = mongoose.model('Task', taskSchema);