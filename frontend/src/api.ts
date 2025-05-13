export const fetchTasks = async () => {
  const response = await fetch("http://localhost:5000/api/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
};