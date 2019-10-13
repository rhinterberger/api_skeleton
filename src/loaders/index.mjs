import dependencyInjectorLoader from './dependecyInjectorLoader.mjs'
import expressLoader from './expressLoader.mjs';
import databaseLoader from './databaseLoader.mjs';
import Logger from './loggerLoader.mjs';

export default async (app) => {

    try {
        const db = await databaseLoader();
        await dependencyInjectorLoader(db);
        await expressLoader(app);

        Logger.info('Init Complete');
    }
    catch (e) {
        Logger.error('Init failed: %o',e);
        throw(e);
    }
};
