import { Request, RequestHandler, Response } from 'express';

const isAlive: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "I'm alive!",
        version: process.env.npm_package_version,
    });
};

export default {
    isAlive,
};
