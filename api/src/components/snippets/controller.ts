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

export default {
    create,
};
