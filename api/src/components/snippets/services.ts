import repository from './repository';
import { ISnippet } from '../../db/models/snippet.model';

const create = async (snippet: ISnippet): Promise<ISnippet | null> => {
    return await repository.create(snippet);
};

const getById = async (id: string): Promise<ISnippet | null> => {
    return await repository.getById(id);
};

const getAll = async ({page, limit}: {page: number, limit: number}): Promise<ISnippet[]> => {
    return await repository.getAll({page, limit});
};

export default {
    create,
    getById,
    getAll,
};
