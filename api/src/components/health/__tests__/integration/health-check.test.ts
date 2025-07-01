import request from 'supertest';
import app from '../../../../app';
import { connectDB, disconnectDB } from '../../../../db';

describe('GET /api/v1/health', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    it('should return an object', async () => {
        const response = await request(app).get('/api/health');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "I'm alive!",
            version: '1.0.0',
        });
    });
});
