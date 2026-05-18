const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://service-request-board-frontend-orcin.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  res.status(500).json({ message: err.message || 'Something went wrong on the server' });
});

// Basic Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ message: `Service Request Board API is running` });
});

module.exports = app;
