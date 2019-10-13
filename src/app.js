import Logger from './loaders/loggerLoader.mjs';
import config from './config/index.mjs';
import express from 'express';
import loadall from './loaders/index.mjs';

async function startServer() {
    const app = express();

    try{
        await loadall(app);
    }
    catch(e)
    {
        Logger.error('Fatal Error occurred - Killing Application!');
        process.exit();
    }

    app.listen(config.port, err => {
        if (err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
        Logger.info(`Server listening on port: ${config.port}`);
    });
}

startServer();
