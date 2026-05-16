const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

// GET /api/jobs - List all jobs with optional filters
router.get('/', jobController.getJobs);

// GET /api/jobs/:id - Fetch a single job
router.get('/:id', jobController.getJobById);

// POST /api/jobs - Create a new job (Protected)
router.post('/', auth, jobController.createJob);

// PATCH /api/jobs/:id - Update job status
router.patch('/:id', jobController.updateJobStatus);

// DELETE /api/jobs/:id - Delete a job (Protected)
router.delete('/:id', auth, jobController.deleteJob);

module.exports = router;
