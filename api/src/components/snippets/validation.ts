import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getLogger } from '../../common/logger';

const logger = getLogger();

const createSchema = z.object({
    text: z
        .string()
        .min(1, { message: 'Text must be at least 1 character long' }),
});

const validate = (schema: z.ZodObject<any>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                logger.error(error);
                res.status(400).json({
                    error: error.errors.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    })),
                });
            } else {
                logger.error(`Validation error: ${error}`);
                next(error);
            }
        }
    };
};

export default {
    create: validate(createSchema),
};
