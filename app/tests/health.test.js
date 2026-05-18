const request = require('supertest');
const app = require('../index');

describe('Endpoints de la API', () => {
  test('GET /health retorna 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /status retorna 200', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toBe(200);
    expect(res.body.service).toBe('aws-infra-final');
  });

  test('GET /api/test retorna 200', async () => {
    const res = await request(app).get('/api/test');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
