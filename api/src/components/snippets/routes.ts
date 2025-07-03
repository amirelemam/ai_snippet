import { Router, Request, Response } from 'express';
import controller from './controller';
import validation from './validation';
import { getLogger } from '../../common/logger';
import { ISnippet } from '../../db/models/snippet.model';

const logger = getLogger();

const router = Router();

router.post(
    '/',
    validation.create,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const snippet: ISnippet = req.body;
            const result = await controller.create(snippet);
            res.status(201).json(result);
        } catch (error) {
            logger.error(`Snippet creation route error: ${error}`);

            res.status(500).json({
                error: 'Failed to generate summary',
                details:
                    error instanceof Error
                        ? error.message
                        : JSON.stringify(error),
            });
            return;
        }
    },
);

router.get(
    '/:id',
    validation.getById,
    async (req: Request, res: Response): Promise<void> => {
        const snippet = await controller.getById(req.params.id);
        if (!snippet) {
            res.status(404).json({ error: 'Snippet not found' });
            return;
        }
        res.status(200).json(snippet);
    },
);

export default router;
