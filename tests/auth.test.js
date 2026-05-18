const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth Endpoints', () => {
  const validUser = {
    email: 'test@example.com',
    password: 'password123'
  };

  describe('POST /api/auth/register', () => {
    it('should successfully register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(validUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', validUser.email);
    });

    it('should not allow duplicate email registration', async () => {
      // First registration
      await request(app).post('/api/auth/register').send(validUser);

      // Second registration with same email
      const res = await request(app)
        .post('/api/auth/register')
        .send(validUser);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email and password are required');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create user before testing login
      await request(app).post('/api/auth/register').send(validUser);
    });

    it('should successfully login an existing user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send(validUser);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should reject incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: validUser.email, password: 'wrongpassword' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should reject non-existent user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
  });
});
