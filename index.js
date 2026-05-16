require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/service-request-board';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB database');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  // In production, send the exact error message so you can debug on Railway!
  res.status(500).json({ message: err.message || 'Something went wrong on the server', error: process.env.NODE_ENV === 'development' ? err : {} });
});

// Basic Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ message: `Service Request Board API is running on ${PORT}` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
