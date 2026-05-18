import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Subir a 10 usuarios
    { duration: '1m',  target: 50 },  // Mantener 50 usuarios
    { duration: '30s', target: 100 }, // Pico de carga
    { duration: '30s', target: 0 },   // Bajar a 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% de requests bajo 500ms
    http_req_failed:   ['rate<0.05'], // Menos del 5% de errores
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // Prueba endpoint /health
  const health = http.get(`${BASE_URL}/health`);
  check(health, {
    'health status 200':        (r) => r.status === 200,
    'health responde rapido':   (r) => r.timings.duration < 500,
    'health tiene hostname':    (r) => JSON.parse(r.body).hostname !== undefined,
  });

  sleep(0.5);

  // Prueba endpoint /api/test
  const api = http.get(`${BASE_URL}/api/test`);
  check(api, {
    'api status 200':      (r) => r.status === 200,
    'api tiene mensaje':   (r) => JSON.parse(r.body).message !== undefined,
  });

  sleep(1);
}
