import Service from "../common/serviceRegistry.mjs";

import Config from "../config/index.mjs";
import Middlewares from '../api/middlewares/index.mjs';

import databaseLoader from './databaseLoader.mjs';
import ModuleLoader from './moduleLoader.mjs';
import expressLoader from './expressLoader.mjs';

export default async (app) => {
    const log = Service.get("logger");

    try {
        Service.register('config',Config);
        Service.register('database', await databaseLoader());
        Service.register('middleware', Middlewares);

        const modules = new ModuleLoader();
        await modules.init();

        await expressLoader(app, modules);

        log.info('Init Complete');
    }
    catch (e) {
        log.error('Init failed: %o',e);
        throw(e);
    }

    return app;
};
