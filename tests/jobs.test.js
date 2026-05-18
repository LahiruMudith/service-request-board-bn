const request = require('supertest');
const app = require('../app');
const JobRequest = require('../models/JobRequest');

describe('Jobs Endpoints', () => {
  let authToken;

  const validJob = {
    title: 'Fix Kitchen Sink',
    description: 'Leaking pipe under the sink',
    category: 'Plumbing',
    location: 'Glasgow',
    contactName: 'John Doe',
    contactEmail: 'john@example.com'
  };

  beforeEach(async () => {
    // Create a user and get token for protected routes
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    
    authToken = res.body.token;
  });

  describe('GET /api/jobs', () => {
    it('should fetch all open jobs successfully', async () => {
      // First create a job
      await JobRequest.create(validJob);

      const res = await request(app).get('/api/jobs');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe(validJob.title);
    });

    it('should filter jobs by search query', async () => {
      await JobRequest.create(validJob);
      await JobRequest.create({ ...validJob, title: 'Fix electrical wiring', category: 'Electrical' });

      const res = await request(app).get('/api/jobs?search=electrical');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Fix electrical wiring');
    });
  });

  describe('POST /api/jobs (Protected)', () => {
    it('should create a new job if authenticated', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(validJob);

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(validJob.title);
      expect(res.body.status).toBe('Open'); // Default status
    });

    it('should reject creation if unauthenticated', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .send(validJob);

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('No token, authorization denied');
    });

    it('should fail if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Missing required fields' });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('DELETE /api/jobs/:id (Protected)', () => {
    it('should delete a job if authenticated', async () => {
      const job = await JobRequest.create(validJob);

      const res = await request(app)
        .delete(`/api/jobs/${job._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Job successfully deleted');

      // Verify it's gone
      const checkJob = await JobRequest.findById(job._id);
      expect(checkJob).toBeNull();
    });

    it('should reject deletion if unauthenticated', async () => {
      const job = await JobRequest.create(validJob);

      const res = await request(app)
        .delete(`/api/jobs/${job._id}`);

      expect(res.statusCode).toBe(401);
    });
  });
});
