import React, { useState, useEffect } from "react";
import {
  fetchTasks,
  addTask,
  toggleTask,
  deleteTask,
  updateTask,
} from "./taskService";
import { Task } from "./taskService";
import "./styles.css";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
    }
  };

  const handleAddTask = async () => {
    try {
      const newTask = await addTask(title);
      setTasks([...tasks, newTask]);
      setTitle("");
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const handleEditStart = (task: Task) => {
    setEditingTaskId(task._id!);
    setEditingTitle(task.title);
  };

  const handleEditSave = async () => {
    if (!editingTaskId) return;

    try {
      const updatedTask = await updateTask({
        _id: editingTaskId,
        title: editingTitle,
        isCompleted: false,
      });
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
      setEditingTaskId(null);
      setEditingTitle("");
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
    setEditingTitle("");
  };
const handleToggleTask = async (task: Task) => {
  try {
    const updatedTask = await toggleTask(task);
    console.log("Updated Task:", updatedTask); // Debugging
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  } catch (err) {
    setError("Failed to update task");
  }
};

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h1 className="text-center mb-4">Task Manager</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task"
          />
          <button className="btn btn-primary mt-2 w-100" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
         <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="list-group-item"
        >
          {editingTaskId === task._id ? (
            <div className="d-flex align-items-center justify-content-between">
              <input
                type="text"
                className="form-control me-2"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
              <div>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={handleEditSave}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleEditCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTask(task)}
                />
                <span
                  style={{
                    textDecoration: task.isCompleted ? "line-through" : "none",
                    maxWidth: "180px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                >
                  {task.title}
                </span>
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditStart(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTask(task._id!)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
      </div>
    </div>
  );
};

export default App;