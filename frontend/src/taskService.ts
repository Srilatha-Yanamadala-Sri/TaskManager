export type Task = {
  _id?: string;
  title: string;
  isCompleted: boolean; // Change `completed` to `isCompleted`
};

const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export const addTask = async (title: string): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
};

export const toggleTask = async (task: Task): Promise<Task> => {
  const res = await fetch(`${API_URL}/${task._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, completed: !task.isCompleted }),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
};
export const updateTask = async (task: Task): Promise<Task> => {
  const res = await fetch(`${API_URL}/${task._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: task.title, isCompleted: task.isCompleted }),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};
