import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../../app';
import Snippet from '../../../../db/models/snippet.model';

describe('GET /api/snippets/:id', () => {
    let testSnippet: { _id: string; text: string; summary: string };

    beforeEach(async () => {
        await Snippet.deleteMany({});

        const snippetData = {
            text: 'Test snippet for get by ID functionality',
            summary: 'A comprehensive test snippet to verify retrieval',
        };

        const createdSnippet = await Snippet.create(snippetData);
        testSnippet = {
            _id: createdSnippet._id.toString(),
            text: createdSnippet.text,
            summary: createdSnippet.summary,
        };
    });

    it('should retrieve a specific snippet by its ID', async () => {
        const response = await request(app)
            .get(`/api/snippets/${testSnippet._id}`)
            .expect(200);

        // Verify response structure
        expect(response.body).toHaveProperty('_id', testSnippet._id);
        expect(response.body).toHaveProperty('text', testSnippet.text);
        expect(response.body).toHaveProperty('summary', testSnippet.summary);
    });

    it('should return 404 for non-existent snippet ID', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app)
            .get(`/api/snippets/${nonExistentId}`)
            .expect(404);

        // Verify error response
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Snippet not found');
    });

    it('should return 400 for invalid ID format', async () => {
        const invalidId = 'invalid-id-format';

        const response = await request(app)
            .get(`/api/snippets/${invalidId}`)
            .expect(400);

        // Verify error response
        expect(response.body).toHaveProperty('error');
        expect(response.body.error[0]).toHaveProperty(
            'message',
            'Invalid snippet ID format',
        );
    });
});
