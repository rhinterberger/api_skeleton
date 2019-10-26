import di from 'typedi';
import Config from '../config/index.mjs';
import Logger from './loggerLoader.mjs';
import middleware from '../api/middlewares/index.mjs';

export default async (db) => {
    try {
        di.Container.set('config',Config);
        di.Container.set('database',db);
        di.Container.set('logger',Logger);
        di.Container.set('middleware', middleware);

        Logger.debug('Done Global Dependecy Injection');
    }
    catch (e) {
        Logger.error('🔥 Error dependency injector loader: %o', e);
        throw e;
    }
};