import services from './services';
import { ISnippet } from '../../db/models/snippet.model';
import { generateSummary } from '../../llm/providers/openai/openai-service';
import { getLogger } from '../../common/logger';

const logger = getLogger();

const create = async (snippet: ISnippet): Promise<ISnippet | null> => {
    try {
        const summary: string = await generateSummary({
            text: snippet.text,
        });

        return await services.create({ ...snippet, summary } as ISnippet);
    } catch (error) {
        logger.error(`Snippet creation error: ${error}`);
        throw error;
    }
};

const getById = async (id: string): Promise<ISnippet | null> => {
    return await services.getById(id);
};

const getAll = async (query: {
    page: number;
    limit: number;
}): Promise<ISnippet[]> => {
    const { page = 1, limit = 10 } = query;
    return await services.getAll({page, limit});
};

export default {
    create,
    getById,
    getAll,
};
