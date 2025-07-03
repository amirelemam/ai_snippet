import request from 'supertest';
import app from '../../../../app';
import Snippet from '../../../../db/models/snippet.model';

describe('GET /api/snippets', () => {
    beforeEach(async () => {
        await Snippet.deleteMany({});
        await Snippet.create([
            {
                text: 'First test snippet about sorting algorithms',
                summary: 'A snippet demonstrating sorting techniques',
            },
            {
                text: 'Second test snippet about data structures',
                summary: 'A snippet exploring complex data structures',
            },
            {
                text: 'Third test snippet about system design',
                summary: 'A snippet discussing system architecture',
            },
        ]);
    });

    it('should retrieve all snippets successfully', async () => {
        const response = await request(app).get('/api/snippets').expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(3);

        response.body.forEach(
            (snippet: { _id: string; text: string; summary: string }) => {
                expect(snippet).toHaveProperty('_id');
                expect(snippet).toHaveProperty('text');
                expect(snippet).toHaveProperty('summary');
            },
        );
    });

    it('should return an empty array when no snippets exist', async () => {
        await Snippet.deleteMany({});

        const response = await request(app).get('/api/snippets').expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    });

    it('should support pagination', async () => {
        const response = await request(app)
            .get('/api/snippets')
            .query({ page: 1, limit: 2 })
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(2);
    });

    it('should handle invalid pagination parameters', async () => {
        const response = await request(app)
            .get('/api/snippets')
            .query({ page: -1, limit: 0 })
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toEqual([
            { field: 'page', message: 'Invalid pagination parameters' },
            { field: 'limit', message: 'Invalid pagination parameters' },
        ]);
    });
});
