import request from 'supertest';
import app from '../../../../app';

describe('GET /api/v1/health', () => {

    it('should return an object', async () => {
        const response = await request(app).get('/api/health');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "I'm alive!",
            version: '1.0.0',
        });
    });
});
