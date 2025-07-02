import request from 'supertest';
import app from '../../../../app';
import Snippet from '../../../../db/models/snippet.model';
import { generateSummary } from '../../../../llm/providers/openai/openai-service';

// Mock the LLM summary generation
jest.mock('../../../../llm/providers/openai/openai-service', () => ({
    generateSummary: jest.fn(),
}));

describe('POST /api/snippets', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('should create a new snippet with AI-generated summary', async () => {
        const snippetData = {
            text: 'Test snippet code that demonstrates a complex algorithm for sorting',
        };

        // Mock the summary generation
        const mockSummary = 'An efficient sorting algorithm implementation';
        (generateSummary as jest.Mock).mockResolvedValue(mockSummary);

        const response = await request(app)
            .post('/api/snippets')
            .send(snippetData)
            .expect(201);

        // Verify the response
        expect(response.body).toBeTruthy();
        expect(response.body).toHaveProperty('_id');

        // Verify the summary generation was called
        expect(generateSummary).toHaveBeenCalledWith({
            text: snippetData.text,
        });

        // Verify the snippet was saved in the database
        const savedSnippet = await Snippet.findById(response.body._id);
        console.log('savedSnippet', savedSnippet);

        expect(savedSnippet).toBeTruthy();
        expect(savedSnippet?.text).toBe(snippetData.text);
        expect(savedSnippet?.summary).toBe(mockSummary);
    });

    it('should handle summary generation failure', async () => {
        const snippetData = {
            text: 'Test snippet code with generation error',
        };

        // Mock the summary generation to throw an error
        (generateSummary as jest.Mock).mockRejectedValue(
            new Error('LLM service unavailable'),
        );

        const response = await request(app)
            .post('/api/snippets')
            .send(snippetData)
            .expect(500);

        // Verify error response
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Failed to generate summary');
    });

    it('should return an error for empty text', async () => {
        const invalidSnippetData = {
            text: '', // Empty text should fail
        };

        const response = await request(app)
            .post('/api/snippets')
            .send(invalidSnippetData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error[0]).toHaveProperty(
            'message',
            'Text must be at least 1 character long',
        );
    });
});
