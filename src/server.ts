import { Config } from './config';
import app from './app';
import logger from './config/logger';

const startServer = () => {
    try {
        app.listen(Config.PORT, () =>
            logger.info(`Listing on port ${Config.PORT}`),
        );
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message);
            setTimeout(() => {
                process.exit(1);
            }, 1000);
        }
    }
};

startServer();
