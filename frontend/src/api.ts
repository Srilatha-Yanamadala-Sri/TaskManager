export const fetchTasks = async () => {
  const response = await fetch("https://taskmanager-1-mb84.onrender.com/api/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
};
