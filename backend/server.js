require('dotenv').config();
const express = require('express');
const corsMiddleware = require('./middleware/cors');
const connectDB = require('./config/database');
const commentRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

//middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/comments', commentRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Backend API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;