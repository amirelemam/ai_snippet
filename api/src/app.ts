import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './common/logger';
import routes from './routes';
import { NotFoundError } from './common/errors';
import { HttpException } from './common/http-exception';
import DatabaseConnection from './db';

DatabaseConnection.connect();

const app = express();

const port = Number(process.env.PORT) || 8080;

app.set('port', port);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
    morgan((tokens: any, req: Request, res: Response): null => {
        logger.http({
            message: [
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'),
                '-',
                tokens['response-time'](req, res),
                'ms',
            ].join(' '),
        });
        return null;
    }),
);

app.use('/api/', routes);

app.use((err: HttpException, req: Request, res: Response): void => {
    if (err) {
        logger.error(`Error: ${JSON.stringify(err)}`);
      
        if (!err.status) res.status(500).json({ error: 'Internal server error' });
        else res.status(err.status).send({ error: err.message });
        return;
    }
    const { status, message } = NotFoundError();
    res.status(status).send(message);
});

export default app;
