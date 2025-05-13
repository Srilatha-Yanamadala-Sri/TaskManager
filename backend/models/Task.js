// filepath: /Users/srilatha/Desktop/Projects/task-manager/backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Task', taskSchema);