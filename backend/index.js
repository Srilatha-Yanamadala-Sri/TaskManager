require('dotenv').config();
const express = require('express');   // <-- only here once
const cors = require('cors');
const connectDB = require('./db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('✅ Task Manager API is up and running!');
});

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
