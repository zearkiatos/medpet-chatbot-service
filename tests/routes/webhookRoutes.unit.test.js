import request from 'supertest';
import express from 'express';
import webhookRoutes from '@routes/webhookRoutes.js';
const app = express();
app.use(express.json());
app.use('/', webhookRoutes);
describe('Unit test suite for webhookRoutes', () => {
    test('Should call handleIncoming with a post request and return 200', async () => {
        const response = await request(app)
        .post('/webhook')
        .send({ key: 'value' });
      expect(response.status).toBe(200);
    });
});