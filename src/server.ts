import { Config } from './config';
import app from './app';

const startServer = () => {
    try {
        app.listen(Config.PORT, () =>
            console.log(`Listing on port ${Config.PORT}`),
        );
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();
