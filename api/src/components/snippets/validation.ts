import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getLogger } from '../../common/logger';

const logger = getLogger();

const createSchema = z.object({
    text: z
        .string()
        .min(1, { message: 'Text must be at least 1 character long' }),
});

const getByIdSchema = z.object({
    id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: 'Invalid snippet ID format',
    }),
});

const getAllSchema = z
    .object({
        page: z.coerce
            .number()
            .int()
            .min(1, { message: 'Invalid pagination parameters' })
            .optional()
            .default(1),
        limit: z.coerce
            .number()
            .int()
            .min(1, { message: 'Invalid pagination parameters' })
            .optional()
            .default(10),
    })
    .strict();

const validate = (schemas: {
    body?: z.ZodObject<any>;
    params?: z.ZodObject<any>;
    query?: z.ZodObject<any>;
}) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            // Validate body if schema provided
            if (schemas.body) {
                schemas.body.parse(req.body);
            }

            // Validate params if schema provided
            if (schemas.params) {
                schemas.params.parse(req.params);
            }

            // Validate query if schema provided
            if (schemas.query) {
                schemas.query.parse(req.query);
            }

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
    create: validate({ body: createSchema }),
    getById: validate({ params: getByIdSchema }),
    getAll: validate({ query: getAllSchema }),
};
