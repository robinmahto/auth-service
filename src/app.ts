import 'reflect-metadata';
import express, { Response, Request } from 'express';
import logger from './config/logger';
import { HttpError } from 'http-errors';
import authRouter from './routes/auth';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('welcome to the auth service');
});

app.use('/auth', authRouter);

app.use((error: HttpError, req: Request, res: Response) => {
    logger.error(error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        errors: [
            {
                type: error.name,
                msg: error.message,
                path: '',
                location: '',
            },
        ],
    });
});

export default app;
