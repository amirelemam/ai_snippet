import repository from './repository';
import { ISnippet } from '../../db/models/snippet.model';

const create = async (snippet: ISnippet): Promise<ISnippet | null> => {
    return await repository.create(snippet);
};

const getById = async (id: string): Promise<ISnippet | null> => {
    return await repository.getById(id);
};

export default {
    create,
    getById,
};
