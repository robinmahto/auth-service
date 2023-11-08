import express, { NextFunction, Response, Request } from 'express';
import logger from './config/logger';
import { HttpError } from 'http-errors';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('welcome to the auth service');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
    (error: HttpError, req: Request, res: Response, _next: NextFunction) => {
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
    },
);

export default app;
