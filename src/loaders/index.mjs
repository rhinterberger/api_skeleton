import dependencyInjectorLoader from './dependecyInjectorLoader.mjs'
import expressLoader from './expressLoader.mjs';
import databaseLoader from './databaseLoader.mjs';
import ModuleLoader from '../modules/index.mjs';
import Logger from './loggerLoader.mjs';

export default async (app) => {

    try {
        const db = await databaseLoader();
        await dependencyInjectorLoader(db);

        const modules = new ModuleLoader();
        await modules.init();
        await expressLoader(app, modules);

        Logger.info('Init Complete');
    }
    catch (e) {
        Logger.error('Init failed: %o',e);
        throw(e);
    }
};
