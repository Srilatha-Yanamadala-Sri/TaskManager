require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // import the connectDB function
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Optional health check route
app.get('/', (req, res) => {
  res.send('✅ Task Manager API is up and running!');
});

// Use your API routes
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
