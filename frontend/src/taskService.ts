const API_URL = `${process.env.REACT_APP_API_BASE}/tasks`;

export type Task = {
  _id?: string;
  title: string;
  isCompleted: boolean;
};

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export const addTask = async (title: string): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, isCompleted: false }),  // <-- fixed key to isCompleted
  });
  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
};

export const toggleTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${API_URL}/${task._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isCompleted: !task.isCompleted }),
  });

  if (!response.ok) {
    console.error("Response Error:", await response.text());
    throw new Error("Failed to toggle task");
  }

  return response.json();
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
