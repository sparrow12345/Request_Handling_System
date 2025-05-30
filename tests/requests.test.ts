import request from 'supertest';
import app from '../src/app'; // Adjust this import if your Express app is elsewhere

describe('GET /requests', () => {
  it('should return 200 and a list of requests (possibly empty)', async () => {
    const res = await request(app).get('/requests');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.requests)).toBe(true);
  });
});