import Services from './core/common/serviceRegistry.mjs';
import Logger from './core/common/logger.mjs';
import initializeApplication from './core/initializeApplication.mjs';

async function run() {
    let app;

    async function setupApplication() {

        try {
            app = await initializeApplication();
        } catch (e) {
            Logger.error('Fatal Error occurred - Killing Application!');
            process.exit();
        }
    }

    function startServer() {
        let config = Services.get('config');
        app.listen(config.port, err => {
            if (err) {
                Logger.error(`Cannon start Server: ${err}`);
                process.exit(1);
            }
            Logger.info(`Server listening on port: ${config.port}`);
        });
    }

    Services.register("logger", Logger);
    await setupApplication();
    startServer();
}

run();
