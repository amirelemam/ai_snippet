import Snippet, { ISnippet } from '../../db/models/snippet.model';
import { getLogger } from '../../common/logger';

const logger = getLogger();

const create = async (snippetData: ISnippet): Promise<ISnippet> => {
    try {
        const snippet = new Snippet({
            text: snippetData.text,
            summary: snippetData.summary,
        });

        logger.info('Attempting to save snippet', {
            text: snippet.text,
            summary: snippet.summary,
        });

        const savedSnippet = await snippet.save();

        logger.info('Snippet saved successfully', {
            _id: savedSnippet._id,
            text: savedSnippet.text,
        });

        return savedSnippet;
    } catch (error) {
        logger.error('Error saving snippet', {
            error,
            snippetData,
        });
        throw error;
    }
};

export default {
    create,
};
